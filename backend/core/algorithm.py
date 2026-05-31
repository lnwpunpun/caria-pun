"""
CARIA-GAP core algorithm — CARIA Equation 1 (Score Adjustment / Capping)
and Equation 2 (Modified Euclidean Similarity, MES).

Reference:
    Seesukong, S., Angskun, T., Keandoungchun, N., Thippongtorn, A., & Angskun, J.
    (2024). CARIA: A Personalized Career Recommender Based on Individual
    Competency Similarity Measure. IJICTE, 20(1).
    DOI: 10.4018/IJICTE.356499  (CC-BY 4.0)

Hard constraints (do NOT change — see Master Prompt Section 16):
  1. All scores are on a 0-100 scale (never 0.0-1.0).
  2. Competency IDs come from the canonical 66 (Section 2) — loaded here from
     data/competencies.json. n = 66.
  3. The MES formula is fixed:  MES = 1 / (1 + sqrt(sum_i (C'_stu_i - C_car_i)^2)).
  4. Always rank and return Top-10.
  5. Raw MES is small (~0.15-0.25) and MUST be normalized before display.
"""

from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path
from typing import Dict, List

import numpy as np

_DATA_DIR = Path(__file__).resolve().parent.parent / "data"
_COMPETENCIES_FILE = _DATA_DIR / "competencies.json"


@lru_cache(maxsize=1)
def competency_keys() -> List[str]:
    """Canonical ordered list of the 66 competency IDs (Skills, Attitudes, Knowledge)."""
    with open(_COMPETENCIES_FILE, encoding="utf-8") as f:
        data = json.load(f)
    keys = [c["id"] for c in data["competencies"]]
    if len(keys) != 66:
        raise ValueError(f"Expected 66 competencies, found {len(keys)}")
    return keys


# --------------------------------------------------------------------------- #
# Equation 1 — Score Adjustment (Capping)
# --------------------------------------------------------------------------- #
def adjust_student_scores(
    student_scores: Dict[str, float],   # 66 dims, scale 0-100
    career_scores: Dict[str, float],    # 66 dims, scale 0-100
) -> Dict[str, float]:
    """
    CARIA Equation 1: adjust student scores before computing MES.

        C'_stu = C_car   if C_stu >= C_car   (cap down -> skill already sufficient)
        C'_stu = C_stu   if C_stu <  C_car   (keep as-is -> still lacking)

    Rationale: a student strong in Programming (95) applying to a role that only
    needs 50 should not be penalised for "over-qualification". Cap to the
    requirement so excess does not distort the distance.
    """
    adjusted: Dict[str, float] = {}
    for comp_id in competency_keys():
        c_stu = float(student_scores.get(comp_id, 0))
        c_car = float(career_scores.get(comp_id, 0))
        adjusted[comp_id] = c_car if c_stu >= c_car else c_stu
    return adjusted


# --------------------------------------------------------------------------- #
# Equation 2 — Modified Euclidean Similarity (MES)
# --------------------------------------------------------------------------- #
def calculate_mes(
    adjusted_scores: Dict[str, float],   # C'_stu (post Eq.1)
    career_scores: Dict[str, float],     # C_car
) -> float:
    """
    CARIA Equation 2:
        MES(C'_stu, C_car) = 1 / (1 + sqrt(sum_i (C'_stu_i - C_car_i)^2))

    Computed over the canonical 66 dimensions. Higher MES = better fit.
    Raw values land around 0.15-0.25 for real career vectors (Table 6 in paper);
    identical vectors give exactly 1.0.
    """
    keys = competency_keys()
    stu_vec = np.array([adjusted_scores.get(k, 0) for k in keys], dtype=float)
    car_vec = np.array([career_scores.get(k, 0) for k in keys], dtype=float)

    distance = float(np.sqrt(np.sum((stu_vec - car_vec) ** 2)))
    return 1.0 / (1.0 + distance)


# --------------------------------------------------------------------------- #
# Full pipeline — Adjust -> MES -> Rank -> Normalize -> Top-10
# --------------------------------------------------------------------------- #
def recommend_careers(
    student_scores: Dict[str, float],   # raw student scores (0-100)
    all_careers: List[Dict],            # every career + competency_vector
) -> List[Dict]:
    """
    Returns the Top-10 careers ranked by MES (descending), each annotated with a
    normalized ``match_percentage`` (Top-1 ~92-98%, Top-10 ~60-70%).

    Tie-break: when raw MES is equal, fall back to ascending career_id so the
    ordering is deterministic (Edge case 3).
    """
    results: List[Dict] = []
    for career in all_careers:
        career_scores = career["competency_vector"]
        adjusted = adjust_student_scores(student_scores, career_scores)
        mes = calculate_mes(adjusted, career_scores)
        results.append(
            {
                "career_id": career["career_id"],
                "career_name": career["career_name"],
                "career_group": career.get("career_group", ""),
                "program": career.get("program", ""),
                "raw_mes": round(mes, 6),
            }
        )

    # Sort by MES desc, deterministic tie-break by career_id asc.
    results.sort(key=lambda x: (-x["raw_mes"], x["career_id"]))

    top10 = results[:10]
    _attach_match_percentage(top10)
    for rank, item in enumerate(top10, start=1):
        item["rank"] = rank
    return top10


def _attach_match_percentage(top10: List[Dict]) -> None:
    """
    Normalize raw MES (small, ~0.15-0.25) into a readable match % (Section 5.3).
    Scales the Top-10 band into roughly 60-95%.
    """
    if not top10:
        return
    if len(top10) == 1:
        top10[0]["match_percentage"] = 95.0
        return

    max_mes = top10[0]["raw_mes"]
    min_mes = top10[-1]["raw_mes"]
    range_mes = (max_mes - min_mes) or 1.0
    for item in top10:
        normalized = (item["raw_mes"] - min_mes) / range_mes
        item["match_percentage"] = round(60 + normalized * 35, 1)


def score_all_careers(
    student_scores: Dict[str, float],
    all_careers: List[Dict],
) -> List[Dict]:
    """Like recommend_careers but returns the full ranked list (used by /simulate)."""
    results: List[Dict] = []
    for career in all_careers:
        adjusted = adjust_student_scores(student_scores, career["competency_vector"])
        mes = calculate_mes(adjusted, career["competency_vector"])
        results.append(
            {
                "career_id": career["career_id"],
                "career_name": career["career_name"],
                "raw_mes": round(mes, 6),
            }
        )
    results.sort(key=lambda x: (-x["raw_mes"], x["career_id"]))
    for rank, item in enumerate(results, start=1):
        item["rank"] = rank
    return results
