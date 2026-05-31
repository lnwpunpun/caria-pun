"""
Local-first data access for CARIA-GAP.

- Loads the JSON datasets (competencies, careers, courses, personas) once at import.
- Provides an in-memory assessment cache keyed by user_id so /recommendations and
  /gap-analysis don't recompute (Master Prompt: SQLite/Mock JSON, local-first).

NOTE (Constraint 6): localStorage on the frontend is cache/fallback only — the
backend in-memory cache here is the authoritative store for a running session.
A SQLite swap-in can replace _ASSESSMENT_CACHE later without touching routers.
"""

from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path
from typing import Dict, List, Optional

_DATA_DIR = Path(__file__).resolve().parent.parent / "data"


def _load(name: str) -> dict:
    with open(_DATA_DIR / name, encoding="utf-8") as f:
        return json.load(f)


@lru_cache(maxsize=1)
def get_careers() -> List[Dict]:
    return _load("careers.json")["careers"]


@lru_cache(maxsize=1)
def get_competencies() -> List[Dict]:
    return _load("competencies.json")["competencies"]


@lru_cache(maxsize=1)
def get_personas() -> List[Dict]:
    return _load("personas.json")["personas"]


def get_career(career_id: str) -> Optional[Dict]:
    return next((c for c in get_careers() if c["career_id"] == career_id), None)


# --------------------------------------------------------------------------- #
# In-memory assessment cache: user_id -> stored result
# --------------------------------------------------------------------------- #
_ASSESSMENT_CACHE: Dict[str, Dict] = {}


def save_assessment(user_id: str, record: Dict) -> None:
    _ASSESSMENT_CACHE[user_id] = record


def get_assessment(user_id: str) -> Optional[Dict]:
    return _ASSESSMENT_CACHE.get(user_id)


def seed_personas() -> None:
    """Optionally pre-cache the demo personas' raw scores so the API is demo-ready
    even before a submit (the result is computed lazily on first request)."""
    for p in get_personas():
        if p["user_id"] not in _ASSESSMENT_CACHE:
            _ASSESSMENT_CACHE[p["user_id"]] = {"scores": p["scores"], "meta": p, "top10": None}
