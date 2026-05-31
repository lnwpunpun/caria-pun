"""POST /api/v1/simulate — What-if re-ranking (Section 6.4).

NOTE: the live UI computes What-if client-side for speed (Section 5.5 /
frontend/src/lib/mes-client.ts). This endpoint is the backup for accuracy
verification.
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException

from models import database as db
from models.schemas import CareerResult, RankingChange, SimulateRequest, SimulateResponse
from routers.assessment import build_top10

router = APIRouter(prefix="/api/v1/simulate", tags=["simulate"])


@router.post("", response_model=SimulateResponse)
def simulate(payload: SimulateRequest) -> SimulateResponse:
    record = db.get_assessment(payload.user_id)
    if record is None:
        raise HTTPException(status_code=404, detail=f"No assessment for user_id={payload.user_id}")

    original_top10 = record.get("top10") or build_top10(record["scores"])
    original_rank = {c["career_id"]: c["rank"] for c in original_top10}

    modified_scores = {**record["scores"], **payload.modified_scores}
    simulated_top10 = build_top10(modified_scores)
    simulated_rank = {c["career_id"]: c["rank"] for c in simulated_top10}

    changes = []
    for c in simulated_top10:
        cid = c["career_id"]
        old = original_rank.get(cid)
        new = simulated_rank.get(cid)
        if old != new:
            delta = (old - new) if old is not None else None
            changes.append(
                RankingChange(
                    career_id=cid,
                    old_rank=old,
                    new_rank=new,
                    change=f"+{delta}" if delta and delta > 0 else (str(delta) if delta is not None else "new"),
                )
            )

    return SimulateResponse(
        original_top3=[c["career_id"] for c in original_top10[:3]],
        simulated_top3=[c["career_id"] for c in simulated_top10[:3]],
        ranking_changes=changes,
        simulated_top10=[CareerResult(**c) for c in simulated_top10],
    )
