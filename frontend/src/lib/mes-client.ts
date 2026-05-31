/**
 * Client-side MES calculation for the What-if Slider (Master Prompt Section 5.5).
 * Mirrors the backend Eq.1 (capping) + Eq.2 (Modified Euclidean Similarity) so the
 * slider can re-rank careers in real time (debounce ~100ms) without hitting the API.
 *
 * Load all 78 career vectors once on page enter, keep in state, recompute locally.
 *
 * MUST stay numerically identical to backend/core/algorithm.py (Constraint 1).
 */

import type { CareerVector, CompetencyScores } from "@/types";

// Equation 1 — Adjust / Capping
export function adjustScores(
  studentScores: CompetencyScores,
  careerScores: CompetencyScores
): CompetencyScores {
  const adjusted: CompetencyScores = {};
  for (const key of Object.keys(careerScores)) {
    const stu = studentScores[key] ?? 0;
    const car = careerScores[key];
    adjusted[key] = stu >= car ? car : stu;
  }
  return adjusted;
}

// Equation 2 — MES
export function calculateMES(
  adjusted: CompetencyScores,
  careerScores: CompetencyScores
): number {
  let sumSquared = 0;
  for (const key of Object.keys(careerScores)) {
    const diff = (adjusted[key] ?? 0) - careerScores[key];
    sumSquared += diff * diff;
  }
  return 1 / (1 + Math.sqrt(sumSquared));
}

export interface RankedCareer {
  career_id: string;
  career_name: string;
  raw_mes: number;
  match_percentage: number;
  rank: number;
}

/** Normalize raw MES into a 60-95% band (Section 5.3). */
function attachMatchPercentage(
  ranked: Omit<RankedCareer, "match_percentage" | "rank">[]
): RankedCareer[] {
  if (ranked.length === 0) return [];
  const maxMes = ranked[0].raw_mes;
  const minMes = ranked[ranked.length - 1].raw_mes;
  const range = maxMes - minMes || 1;
  return ranked.map((c, i) => ({
    ...c,
    rank: i + 1,
    match_percentage:
      ranked.length === 1
        ? 95.0
        : Math.round((60 + ((c.raw_mes - minMes) / range) * 35) * 10) / 10,
  }));
}

/**
 * Re-rank careers after a slider change. Returns Top-10 with normalized match %.
 * Tie-break by career_id ascending to match the backend (deterministic).
 */
export function simulateWhatIf(
  currentScores: CompetencyScores,
  changedSkill: string,
  newValue: number,
  allCareers: CareerVector[]
): RankedCareer[] {
  const modified = { ...currentScores, [changedSkill]: newValue };
  return recomputeRanking(modified, allCareers).slice(0, 10);
}

/** Full re-ranking over all careers (used by What-if + initial load). */
export function recomputeRanking(
  scores: CompetencyScores,
  allCareers: CareerVector[]
): RankedCareer[] {
  const results = allCareers.map((career) => {
    const adjusted = adjustScores(scores, career.competency_vector);
    return {
      career_id: career.career_id,
      career_name: career.career_name,
      raw_mes: calculateMES(adjusted, career.competency_vector),
    };
  });
  results.sort((a, b) =>
    b.raw_mes !== a.raw_mes ? b.raw_mes - a.raw_mes : a.career_id.localeCompare(b.career_id)
  );
  return attachMatchPercentage(results);
}
