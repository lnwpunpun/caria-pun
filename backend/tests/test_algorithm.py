"""
Unit tests for the CARIA-GAP core algorithm (Eq.1 + Eq.2), pipeline, gap analysis,
and the documented persona behaviours.

Run from backend/:  python -m pytest tests/ -v
"""

import json
import math
from pathlib import Path

import pytest

from core.algorithm import (
    adjust_student_scores,
    calculate_mes,
    competency_keys,
    recommend_careers,
    score_all_careers,
)
from core.gap_analyzer import analyze_gap

DATA = Path(__file__).resolve().parent.parent / "data"


@pytest.fixture(scope="module")
def careers():
    return json.load(open(DATA / "careers.json", encoding="utf-8"))["careers"]


@pytest.fixture(scope="module")
def personas():
    return json.load(open(DATA / "personas.json", encoding="utf-8"))["personas"]


def full_vector(value):
    return {k: value for k in competency_keys()}


# --------------------------------------------------------------------------- #
# Canonical model
# --------------------------------------------------------------------------- #
def test_exactly_66_competencies():
    keys = competency_keys()
    assert len(keys) == 66
    assert sum(k.startswith("S") for k in keys) == 31
    assert sum(k.startswith("A") for k in keys) == 6
    assert sum(k.startswith("K") for k in keys) == 29


# --------------------------------------------------------------------------- #
# Equation 1 — capping
# --------------------------------------------------------------------------- #
def test_eq1_caps_when_student_exceeds():
    student = {"S20_Programming": 95}
    career = {"S20_Programming": 50}
    adjusted = adjust_student_scores(student, career)
    assert adjusted["S20_Programming"] == 50  # capped down to requirement


def test_eq1_keeps_when_student_lacks():
    student = {"S20_Programming": 30}
    career = {"S20_Programming": 80}
    adjusted = adjust_student_scores(student, career)
    assert adjusted["S20_Programming"] == 30  # kept (still lacking)


def test_eq1_equal_scores():
    adjusted = adjust_student_scores({"S14_Mathematics": 60}, {"S14_Mathematics": 60})
    assert adjusted["S14_Mathematics"] == 60


# --------------------------------------------------------------------------- #
# Equation 2 — MES
# --------------------------------------------------------------------------- #
def test_eq2_identical_vectors_give_one():
    v = full_vector(70)
    assert calculate_mes(v, v) == pytest.approx(1.0)


def test_eq2_matches_hand_computation():
    # Single non-zero difference of 30 across the 66-dim space.
    career = full_vector(0)
    adjusted = full_vector(0)
    career["S20_Programming"] = 30  # student 0 vs career 30 -> diff 30
    expected = 1.0 / (1.0 + math.sqrt(30 ** 2))
    assert calculate_mes(adjusted, career) == pytest.approx(expected)


def test_eq2_higher_is_better():
    career = full_vector(60)
    close = full_vector(58)
    far = full_vector(20)
    assert calculate_mes(close, career) > calculate_mes(far, career)


def test_eq2_in_realistic_band(careers):
    """Real career vectors against a mid-range student land roughly 0.01-0.3."""
    student = full_vector(60)
    for c in careers[:10]:
        mes = calculate_mes(adjust_student_scores(student, c["competency_vector"]), c["competency_vector"])
        assert 0.0 < mes < 0.5


# --------------------------------------------------------------------------- #
# Pipeline
# --------------------------------------------------------------------------- #
def test_recommend_returns_exactly_top10(careers, personas):
    top = recommend_careers(personas[0]["scores"], careers)
    assert len(top) == 10


def test_recommend_sorted_descending(careers, personas):
    top = recommend_careers(personas[0]["scores"], careers)
    mes_values = [c["raw_mes"] for c in top]
    assert mes_values == sorted(mes_values, reverse=True)
    assert [c["rank"] for c in top] == list(range(1, 11))


def test_match_percentage_band(careers, personas):
    top = recommend_careers(personas[0]["scores"], careers)
    assert top[0]["match_percentage"] == 95.0  # normalized top is 95
    for c in top:
        assert 60.0 <= c["match_percentage"] <= 95.0


def test_tie_break_is_deterministic(careers, personas):
    a = recommend_careers(personas[2]["scores"], careers)
    b = recommend_careers(personas[2]["scores"], careers)
    assert [c["career_id"] for c in a] == [c["career_id"] for c in b]


# --------------------------------------------------------------------------- #
# Persona behaviour (robust properties — within-group order is jitter-driven)
# --------------------------------------------------------------------------- #
ANALYTICAL_GROUPS = {"Data Science", "Enterprise Software", "AI & Emerging Technology"}


def test_persona_ton_lands_in_tech(careers, personas):
    ton = next(p for p in personas if p["user_id"] == "U001")
    top = recommend_careers(ton["scores"], careers)
    assert top[0]["program"] == "DT"
    assert top[0]["career_group"] in ANALYTICAL_GROUPS
    # At least one spec-suggested career within Top-10.
    top_ids = {c["career_id"] for c in top}
    assert top_ids & set(ton["expected_top"])


def test_persona_mai_is_creative(careers, personas):
    mai = next(p for p in personas if p["user_id"] == "U002")
    top = recommend_careers(mai["scores"], careers)
    assert top[0]["career_id"] == "DM01"  # Graphic Designer


def test_persona_fuse_is_dt_generalist(careers, personas):
    fuse = next(p for p in personas if p["user_id"] == "U003")
    top = recommend_careers(fuse["scores"], careers)
    assert top[0]["program"] == "DT"
    top_ids = {c["career_id"] for c in top}
    assert top_ids & set(fuse["expected_top"])  # DT05 Web Master is in Top-10


# --------------------------------------------------------------------------- #
# Gap analysis
# --------------------------------------------------------------------------- #
def test_gap_analysis_structure(careers, personas):
    ton = personas[0]["scores"]
    career = next(c for c in careers if c["career_id"] == "DT08")
    result = analyze_gap(ton, career["competency_vector"])
    assert result["gaps_count"] + result["strengths_count"] == 66
    assert 0 <= result["readiness_percentage"] <= 100
    # gaps sorted by severity descending
    scores = [g["gap_score"] for g in result["gaps"]]
    assert scores == sorted(scores, reverse=True)


def test_ton_has_expected_gaps_for_software_dev(careers, personas):
    ton = personas[0]["scores"]
    career = next(c for c in careers if c["career_id"] == "DT08")
    result = analyze_gap(ton, career["competency_vector"])
    gap_ids = {g["competency_id"] for g in result["gaps"]}
    # Persona ต้น is documented to lack Systems Analysis/Design vs Software Developer.
    assert {"S25_Systems_Analysis", "S26_Systems_Design"} & gap_ids
