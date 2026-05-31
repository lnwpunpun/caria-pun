"""GET /api/v1/gap-analysis/{user_id}/{career_id} — radar + gaps + courses (Section 6.3)."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException

from core.algorithm import adjust_student_scores, calculate_mes
from core.gap_analyzer import analyze_gap, attach_courses, build_radar_data
from models import database as db
from models.schemas import GapAnalysisResponse

router = APIRouter(prefix="/api/v1/gap-analysis", tags=["gap-analysis"])


def _match_percentage_for(user_id: str, career_id: str) -> float:
    """Reuse the cached Top-10 match% if present; else None-safe default."""
    record = db.get_assessment(user_id)
    for c in (record.get("top10") or []) if record else []:
        if c["career_id"] == career_id:
            return c["match_percentage"]
    return 0.0


@router.get("/{user_id}/{career_id}", response_model=GapAnalysisResponse)
def get_gap_analysis(user_id: str, career_id: str) -> GapAnalysisResponse:
    record = db.get_assessment(user_id)
    if record is None:
        raise HTTPException(status_code=404, detail=f"No assessment for user_id={user_id}")

    career = db.get_career(career_id)
    if career is None:
        raise HTTPException(status_code=404, detail=f"Unknown career_id={career_id}")

    student_scores = record["scores"]
    career_vector = career["competency_vector"]

    analysis = analyze_gap(student_scores, career_vector)
    attach_courses(analysis["gaps"])
    radar = build_radar_data(student_scores, career_vector)

    match_pct = _match_percentage_for(user_id, career_id)
    if not match_pct:
        # Fallback: derive a rough match% from raw MES if not in cached Top-10.
        adjusted = adjust_student_scores(student_scores, career_vector)
        match_pct = round(calculate_mes(adjusted, career_vector) * 100, 1)

    return GapAnalysisResponse(
        career={"career_id": career["career_id"], "career_name": career["career_name"]},
        match_percentage=match_pct,
        readiness_percentage=analysis["readiness_percentage"],
        radar_data=radar,
        gaps=analysis["gaps"],
        strengths=analysis["strengths"],
    )
