"""
Resume -> 60-dimension competency vector (Skills 31 + Knowledge 29).

This is the OPTIONAL "Option A" path of the Hybrid Assessment (Feature 8.3).
Attitudes (6 dims) are NEVER inferred from a resume — the user always answers
those 6 via sliders.

Design: this module degrades gracefully. If no LLM API key is configured (or the
`anthropic` package is missing), `parse_resume` raises ResumeParserUnavailable so
the caller can fall back to the manual slider questionnaire (Option B / Edge case 5).

NOTE: this is a Day-1 stub. The real structured-output prompt is left for Pair 1
to implement; the contract (input bytes -> dict of 60 competency scores 0-100) is
fixed here.
"""

from __future__ import annotations

import os
from typing import Dict

from .algorithm import competency_keys


class ResumeParserUnavailable(RuntimeError):
    """Raised when no LLM backend is available; caller should fall back to manual quiz."""


def is_available() -> bool:
    return bool(os.getenv("ANTHROPIC_API_KEY") or os.getenv("OPENAI_API_KEY"))


def skill_and_knowledge_keys() -> list[str]:
    """The 60 dimensions a resume can populate (everything except A01-A06)."""
    return [k for k in competency_keys() if not k.startswith("A")]


def parse_resume(file_bytes: bytes, filename: str = "resume.pdf") -> Dict[str, float]:
    """
    Parse a resume into a 60-dim competency vector (Skills + Knowledge), scale 0-100.

    Raises ResumeParserUnavailable if no LLM is configured — caller falls back to
    the manual slider questionnaire.

    TODO(Pair 1): implement structured-output extraction (Anthropic/OpenAI).
    Suggested approach:
      1. Extract text from the PDF (pypdf / pdfplumber).
      2. Send text + the 60 competency definitions to the LLM with a JSON schema
         forcing { "<comp_id>": <int 0-100>, ... } for all 60 keys.
      3. Validate keys against skill_and_knowledge_keys(); clamp to 0-100.
    """
    if not is_available():
        raise ResumeParserUnavailable(
            "No LLM API key configured (ANTHROPIC_API_KEY / OPENAI_API_KEY). "
            "Fall back to the manual slider questionnaire (Option B)."
        )
    raise NotImplementedError(
        "Resume parsing not yet implemented — use the manual questionnaire for now."
    )
