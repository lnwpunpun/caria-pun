"""
Pydantic v2 request/response models for the CARIA-GAP API (Master Prompt Section 6).
All competency scores are on a 0-100 scale.
"""

from __future__ import annotations

from typing import Dict, List, Optional

from pydantic import BaseModel, Field

CompetencyScores = Dict[str, float]  # { "<comp_id>": 0-100 }


# --------------------------------------------------------------------------- #
# Assessment
# --------------------------------------------------------------------------- #
class AssessmentSubmit(BaseModel):
    user_id: str = Field(..., examples=["U001"])
    program: str = Field(..., description="DT or DM")
    year: Optional[int] = Field(None, ge=1, le=8)
    gpa: Optional[float] = Field(None, ge=0, le=4)
    scores: CompetencyScores = Field(..., description="66-dim competency scores, 0-100")
    input_method: str = Field("manual", description="hybrid | resume | manual")


class CareerResult(BaseModel):
    rank: int
    career_id: str
    career_name: str
    career_group: str
    program: str
    match_percentage: float
    raw_mes: float
    top_strengths: List[str] = []
    top_gaps: List[str] = []


class Top10Response(BaseModel):
    assessment_id: str
    user_id: str
    timestamp: str
    top10_careers: List[CareerResult]


# --------------------------------------------------------------------------- #
# Gap analysis (Section 6.3)
# --------------------------------------------------------------------------- #
class RadarSeries(BaseModel):
    labels: List[str]
    student_scores: List[float]
    career_scores: List[float]


class RadarSummary(BaseModel):
    labels: List[str]
    student_averages: List[float]
    career_averages: List[float]


class RadarData(BaseModel):
    summary_3axis: RadarSummary
    drilldown_skills: RadarSeries
    drilldown_attitudes: RadarSeries
    drilldown_knowledge: RadarSeries


class CourseRec(BaseModel):
    course_id: str
    title: str
    provider: str
    price_thb: int
    duration_hours: int
    level: Optional[str] = None
    url: str
    affiliate: bool = True


class GapItem(BaseModel):
    competency_id: str
    domain: str
    student_score: float
    career_required: float
    gap_score: float
    gap_percentage: float
    recommended_courses: List[CourseRec] = []


class StrengthItem(BaseModel):
    competency_id: str
    domain: str
    student_score: float
    career_required: float
    surplus: float


class CareerRef(BaseModel):
    career_id: str
    career_name: str


class GapAnalysisResponse(BaseModel):
    career: CareerRef
    match_percentage: float
    readiness_percentage: float
    radar_data: RadarData
    gaps: List[GapItem]
    strengths: List[StrengthItem]


# --------------------------------------------------------------------------- #
# Simulate / What-if (Section 6.4)
# --------------------------------------------------------------------------- #
class SimulateRequest(BaseModel):
    user_id: str
    modified_scores: CompetencyScores = Field(
        ..., description="Subset of competencies to override, 0-100"
    )


class RankingChange(BaseModel):
    career_id: str
    old_rank: Optional[int]
    new_rank: Optional[int]
    change: str


class SimulateResponse(BaseModel):
    original_top3: List[str]
    simulated_top3: List[str]
    ranking_changes: List[RankingChange]
    simulated_top10: List[CareerResult]
