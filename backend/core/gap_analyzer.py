"""
Gap analysis + radar-chart data builder for CARIA-GAP.

- analyze_gap        : Section 5.4 — diff between student and required scores.
- attach_courses     : maps each gap competency to recommended courses (courses.json).
- build_radar_data   : produces the 3-axis summary + per-domain drill-down series
                       consumed by the Recharts radar (Section 6.3 / Feature 8.2).
"""

from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path
from typing import Dict, List

from .algorithm import competency_keys

_DATA_DIR = Path(__file__).resolve().parent.parent / "data"
_COMPETENCIES_FILE = _DATA_DIR / "competencies.json"
_COURSES_FILE = _DATA_DIR / "courses.json"


@lru_cache(maxsize=1)
def _competency_meta() -> Dict[str, Dict]:
    with open(_COMPETENCIES_FILE, encoding="utf-8") as f:
        data = json.load(f)
    return {c["id"]: c for c in data["competencies"]}


@lru_cache(maxsize=1)
def _courses_by_competency() -> Dict[str, List[Dict]]:
    if not _COURSES_FILE.exists():
        return {}
    with open(_COURSES_FILE, encoding="utf-8") as f:
        data = json.load(f)
    # courses.json shape: { "by_competency": { "<comp_id>": [course, ...] } }
    return data.get("by_competency", {})


def _domain_of(comp_id: str) -> str:
    return _competency_meta().get(comp_id, {}).get("domain", "skill")


# --------------------------------------------------------------------------- #
# Gap analysis (Section 5.4)
# --------------------------------------------------------------------------- #
def analyze_gap(
    student_scores: Dict[str, float],
    career_scores: Dict[str, float],
) -> Dict:
    """
    Compare a student's raw scores against a target career's required scores.
    Gap  = competency where the student is below the requirement (diff < 0).
    Strength = competency where the student meets/exceeds it.
    """
    gaps: List[Dict] = []
    strengths: List[Dict] = []

    for comp_id in competency_keys():
        c_stu = float(student_scores.get(comp_id, 0))
        c_car = float(career_scores.get(comp_id, 0))
        diff = c_stu - c_car

        if diff < 0:
            gaps.append(
                {
                    "competency_id": comp_id,
                    "domain": _domain_of(comp_id),
                    "student_score": c_stu,
                    "career_required": c_car,
                    "gap_score": round(abs(diff), 1),
                    "gap_percentage": round(abs(diff) / c_car * 100, 1) if c_car else 0.0,
                }
            )
        else:
            strengths.append(
                {
                    "competency_id": comp_id,
                    "domain": _domain_of(comp_id),
                    "student_score": c_stu,
                    "career_required": c_car,
                    "surplus": round(diff, 1),
                }
            )

    gaps.sort(key=lambda x: x["gap_score"], reverse=True)
    strengths.sort(key=lambda x: x["surplus"], reverse=True)

    return {
        "total_competencies": 66,
        "gaps_count": len(gaps),
        "strengths_count": len(strengths),
        "gaps": gaps,
        "strengths": strengths,
        "readiness_percentage": round(len(strengths) / 66 * 100, 1),
    }


def attach_courses(gaps: List[Dict], top_n_gaps: int = 8) -> List[Dict]:
    """Attach recommended_courses to the most severe gaps (closes them first)."""
    catalog = _courses_by_competency()
    for gap in gaps[:top_n_gaps]:
        gap["recommended_courses"] = catalog.get(gap["competency_id"], [])
    return gaps


# --------------------------------------------------------------------------- #
# Radar chart data (Section 6.3 / Feature 8.2)
# --------------------------------------------------------------------------- #
def build_radar_data(
    student_scores: Dict[str, float],
    career_scores: Dict[str, float],
) -> Dict:
    """
    Build the nested radar payload:
      - summary_3axis    : averaged Skills / Attitudes / Knowledge (Level 1)
      - drilldown_*      : full per-dimension series for each domain (Level 2)
    """
    meta = _competency_meta()
    domains = {"skill": [], "attitude": [], "knowledge": []}
    for comp_id in competency_keys():
        domains[meta[comp_id]["domain"]].append(comp_id)

    def series(ids: List[str]) -> Dict:
        return {
            "labels": ids,
            "student_scores": [float(student_scores.get(i, 0)) for i in ids],
            "career_scores": [float(career_scores.get(i, 0)) for i in ids],
        }

    def avg(scores: Dict[str, float], ids: List[str]) -> float:
        return round(sum(float(scores.get(i, 0)) for i in ids) / len(ids), 1)

    return {
        "summary_3axis": {
            "labels": ["Skills", "Attitudes", "Knowledge"],
            "student_averages": [
                avg(student_scores, domains["skill"]),
                avg(student_scores, domains["attitude"]),
                avg(student_scores, domains["knowledge"]),
            ],
            "career_averages": [
                avg(career_scores, domains["skill"]),
                avg(career_scores, domains["attitude"]),
                avg(career_scores, domains["knowledge"]),
            ],
        },
        "drilldown_skills": series(domains["skill"]),
        "drilldown_attitudes": series(domains["attitude"]),
        "drilldown_knowledge": series(domains["knowledge"]),
    }
