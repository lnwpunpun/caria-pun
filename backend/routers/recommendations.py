"""GET /api/v1/recommendations/{user_id} — return cached Top-10 (Section 6.2)."""

from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException

from models import database as db
from models.schemas import CareerResult, Top10Response
from routers.assessment import build_top10

router = APIRouter(prefix="/api/v1/recommendations", tags=["recommendations"])


@router.get("/{user_id}", response_model=Top10Response)
def get_recommendations(user_id: str) -> Top10Response:
    record = db.get_assessment(user_id)
    if record is None:
        raise HTTPException(status_code=404, detail=f"No assessment found for user_id={user_id}")

    # Compute lazily if only raw scores are cached (e.g. seeded personas).
    top10 = record.get("top10")
    if not top10:
        top10 = build_top10(record["scores"])
        record["top10"] = top10
        db.save_assessment(user_id, record)

    return Top10Response(
        assessment_id=record.get("assessment_id", f"ASM_{user_id}"),
        user_id=user_id,
        timestamp=datetime.now(timezone.utc).isoformat(),
        top10_careers=[CareerResult(**c) for c in top10],
        dream_career_group=record.get("dream_career_group"),
        dream_career_id=record.get("dream_career_id"),
    )
