"""
Deterministic mock-data generator for CARIA-GAP.

Produces:
  - careers.json  : 78 careers (DT 36 + DM 42), each a full 66-dim competency
                    vector (scale 0-100), with group-correlated profiles so the
                    MES rankings make sense and match the demo personas (Section 7).
  - courses.json  : upskill catalog keyed by competency_id (Feature 8.4).

Seeded (random.seed(42)) -> reproducible. Re-run any time:
    python data/generate_data.py

IMPORTANT (Master Prompt Section 9.2): real vectors should come from the CARIA
paper (Table 3 / Figure 2) if the authors share them. These are plausible mocks.
Career names/groups for DT01-DT23 and DM01-DM28 are taken verbatim from Section
9.1; remaining slots are clearly marked placeholders (same-group plausible titles).
"""

from __future__ import annotations

import json
import random
from pathlib import Path
from typing import Dict, List

random.seed(42)

DATA_DIR = Path(__file__).resolve().parent
COMPETENCIES_FILE = DATA_DIR / "competencies.json"


def load_competency_keys() -> List[str]:
    with open(COMPETENCIES_FILE, encoding="utf-8") as f:
        return [c["id"] for c in json.load(f)["competencies"]]


KEYS = load_competency_keys()

# Competencies that are essentially irrelevant to digital careers -> kept low so
# students are not unfairly penalised for lacking them.
LOW_RELEVANCE = {
    "S06_Equipment_Maintenance", "S08_Installation", "K02_Building_and_Construction",
    "K13_Food_Production", "K14_Geography", "K15_History_and_Archeology",
    "K18_Mechanical", "K19_Medicine_and_Dentistry", "K21_Philosophy_and_Theology",
    "K23_Production_and_Processing", "K29_Transportation",
}

# ----------------------------------------------------------------------------- #
# Career roster (code, name, group, program).  Verbatim names from Section 9.1
# where available; placeholders flagged with a trailing marker in _placeholder set.
# ----------------------------------------------------------------------------- #
PLACEHOLDER_CODES: set[str] = set()


def _c(code: str, name: str, group: str, program: str, placeholder: bool = False):
    if placeholder:
        PLACEHOLDER_CODES.add(code)
    return {"career_id": code, "career_name": name, "career_group": group, "program": program}


CAREERS_META = [
    # --- Digital Technology (DT) -------------------------------------------- #
    _c("DT01", "Web Content Writer", "Web Application", "DT"),
    _c("DT02", "Web Designer", "Web Application", "DT"),
    _c("DT03", "Web Marketer", "Web Application", "DT"),
    _c("DT04", "Web Developer/.NET Programmer", "Web Application", "DT"),
    _c("DT05", "Web Master", "Web Application", "DT"),
    _c("DT06", "UI/UX Designer", "Web Application", "DT"),
    _c("DT07", "Mobile Developer", "Enterprise Software", "DT"),
    _c("DT08", "Software Developer", "Enterprise Software", "DT"),
    _c("DT09", "System Analyst", "Enterprise Software", "DT"),
    _c("DT10", "Software Engineer", "Enterprise Software", "DT"),
    _c("DT11", "Software Tester", "Enterprise Software", "DT"),
    _c("DT12", "Embedded System Programmer", "Enterprise Software", "DT"),
    _c("DT13", "IT Support", "IT Support", "DT"),
    _c("DT14", "Data Curator", "Data Science", "DT"),
    _c("DT15", "Digital Data Curator", "Data Science", "DT"),
    _c("DT16", "Data Architect", "Data Science", "DT"),
    _c("DT17", "Data Engineer", "Data Science", "DT"),
    _c("DT18", "Data Scientist/Data Analyst", "Data Science", "DT"),
    _c("DT19", "Network Administrator", "Cloud Technology", "DT"),
    _c("DT20", "Network System Engineer", "Cloud Technology", "DT"),
    _c("DT21", "Network Analyst", "Cloud Technology", "DT"),
    _c("DT22", "Security Administrator", "Cloud Technology", "DT"),
    _c("DT23", "Penetration Tester", "Cloud Technology", "DT"),
    # DT24-DT36: 6th group (placeholders, plausible same-domain titles)
    _c("DT24", "Machine Learning Engineer", "AI & Emerging Technology", "DT", True),
    _c("DT25", "AI Engineer", "AI & Emerging Technology", "DT", True),
    _c("DT26", "Cloud Architect", "Cloud Technology", "DT", True),
    _c("DT27", "DevOps Engineer", "Cloud Technology", "DT", True),
    _c("DT28", "Site Reliability Engineer", "Cloud Technology", "DT", True),
    _c("DT29", "Database Administrator", "Data Science", "DT", True),
    _c("DT30", "Business Intelligence Analyst", "Data Science", "DT", True),
    _c("DT31", "Cybersecurity Analyst", "Cloud Technology", "DT", True),
    _c("DT32", "IoT Developer", "AI & Emerging Technology", "DT", True),
    _c("DT33", "Blockchain Developer", "AI & Emerging Technology", "DT", True),
    _c("DT34", "QA Automation Engineer", "Enterprise Software", "DT", True),
    _c("DT35", "Solutions Architect", "Enterprise Software", "DT", True),
    _c("DT36", "Technical Project Manager", "Enterprise Software", "DT", True),
    # --- Digital Media (DM) ------------------------------------------------- #
    _c("DM01", "Graphic Designer", "Digital Content", "DM"),
    _c("DM02", "Photographer", "Digital Content", "DM"),
    _c("DM03", "Social Blogger/Vlogger", "Digital Content", "DM"),
    _c("DM04", "Digital Copywriter", "Digital Content", "DM"),
    _c("DM05", "Animator", "Animation", "DM"),
    _c("DM06", "Multimedia Artist", "Animation", "DM"),
    _c("DM07", "Screenplay Writer", "Film", "DM"),
    _c("DM08", "Director", "Film", "DM"),
    _c("DM09", "Video and Audio Editor", "Film", "DM"),
    _c("DM10", "Special Effect Designer", "Film", "DM"),
    _c("DM11", "Storyline Creator", "Game", "DM"),
    _c("DM12", "Scene Designer", "Game", "DM"),
    _c("DM13", "Game Modeler", "Game", "DM"),
    _c("DM14", "Game Animator", "Game", "DM"),
    _c("DM15", "Game Programmer", "Game", "DM"),
    _c("DM16", "Producer", "Production", "DM"),
    _c("DM17", "Creative", "Production", "DM"),
    _c("DM18", "Account Executive", "Marketing", "DM"),
    _c("DM19", "Public Relations Officer", "Marketing", "DM"),
    _c("DM20", "Marketing Coordinator", "Marketing", "DM"),
    _c("DM21", "Social Media Strategist", "Marketing", "DM"),
    _c("DM22", "Social Influencer", "Marketing", "DM"),
    _c("DM23", "One Man Band Journalist", "New Media", "DM"),
    _c("DM24", "Mobile UI/UX Designer", "New Media", "DM"),
    _c("DM25", "Cross-platform Mobile Developer", "New Media", "DM"),
    _c("DM26", "Digital Media Evaluator", "Research", "DM"),
    _c("DM27", "Researcher", "Research", "DM"),
    _c("DM28", "Graduate Student", "Research", "DM"),
    # DM29-DM42: 9th group (placeholders)
    _c("DM29", "Motion Graphic Designer", "Interactive Media", "DM", True),
    _c("DM30", "3D Modeler", "Interactive Media", "DM", True),
    _c("DM31", "Concept Artist", "Interactive Media", "DM", True),
    _c("DM32", "Sound Designer", "Interactive Media", "DM", True),
    _c("DM33", "Music Composer", "Interactive Media", "DM", True),
    _c("DM34", "Podcast Producer", "New Media", "DM", True),
    _c("DM35", "Content Strategist", "Marketing", "DM", True),
    _c("DM36", "Brand Designer", "Digital Content", "DM", True),
    _c("DM37", "Illustration Artist", "Digital Content", "DM", True),
    _c("DM38", "AR/VR Designer", "Interactive Media", "DM", True),
    _c("DM39", "Esports Manager", "Game", "DM", True),
    _c("DM40", "Community Manager", "Marketing", "DM", True),
    _c("DM41", "Digital Marketing Specialist", "Marketing", "DM", True),
    _c("DM42", "Media Researcher", "Research", "DM", True),
]

# ----------------------------------------------------------------------------- #
# Group competency profiles: emphasized competencies -> target requirement.
# Anything not listed defaults to a moderate baseline (and LOW_RELEVANCE dims low).
# RIASEC attitudes (A01-A06) are set explicitly per group.
# ----------------------------------------------------------------------------- #
GROUP_PROFILES: Dict[str, Dict[str, int]] = {
    "Web Application": {
        "S20_Programming": 70, "S26_Systems_Design": 72, "S27_Technology_Design": 70,
        "S05_Critical_Thinking": 68, "S29_Writing": 60, "K05_Computers_and_Electronics": 78,
        "K07_Design": 75, "K04_Communications_and_Media": 65, "K11_English_Language": 60,
        "A01_Artistic": 62, "A02_Conventional": 45, "A03_Enterprising": 48,
        "A04_Investigative": 60, "A05_Realistic": 50, "A06_Social": 50,
    },
    "Enterprise Software": {
        "S03_Complex_Problem_Solving": 85, "S05_Critical_Thinking": 80, "S20_Programming": 90,
        "S25_Systems_Analysis": 82, "S26_Systems_Design": 82, "S14_Mathematics": 70,
        "K05_Computers_and_Electronics": 90, "K10_Engineering_and_Technology": 78, "K17_Mathematics": 70,
        "A01_Artistic": 18, "A02_Conventional": 60, "A03_Enterprising": 45,
        "A04_Investigative": 82, "A05_Realistic": 58, "A06_Social": 40,
    },
    "IT Support": {
        "S28_Troubleshooting": 82, "S15_Monitoring": 70, "S02_Active_Listening": 72,
        "S24_Speaking": 65, "K05_Computers_and_Electronics": 80, "K06_Customer_and_Personal_Service": 75,
        "K28_Telecommunications": 65,
        "A01_Artistic": 20, "A02_Conventional": 70, "A03_Enterprising": 40,
        "A04_Investigative": 60, "A05_Realistic": 65, "A06_Social": 62,
    },
    "Data Science": {
        "S03_Complex_Problem_Solving": 82, "S05_Critical_Thinking": 82, "S14_Mathematics": 85,
        "S18_Operations_Analysis": 78, "S20_Programming": 80, "S25_Systems_Analysis": 78,
        "K05_Computers_and_Electronics": 85, "K17_Mathematics": 85, "K10_Engineering_and_Technology": 70,
        "A01_Artistic": 22, "A02_Conventional": 58, "A03_Enterprising": 42,
        "A04_Investigative": 88, "A05_Realistic": 52, "A06_Social": 38,
    },
    "Cloud Technology": {
        "S28_Troubleshooting": 80, "S25_Systems_Analysis": 78, "S17_Operation_and_Control": 75,
        "S15_Monitoring": 75, "S31_Quality_Control_Analysis": 70, "S20_Programming": 65,
        "K05_Computers_and_Electronics": 88, "K10_Engineering_and_Technology": 78,
        "K25_Public_Safety_and_Security": 70, "K28_Telecommunications": 78,
        "A01_Artistic": 18, "A02_Conventional": 65, "A03_Enterprising": 42,
        "A04_Investigative": 75, "A05_Realistic": 68, "A06_Social": 38,
    },
    "AI & Emerging Technology": {
        "S03_Complex_Problem_Solving": 88, "S05_Critical_Thinking": 85, "S14_Mathematics": 88,
        "S20_Programming": 88, "S18_Operations_Analysis": 80, "S25_Systems_Analysis": 80,
        "K05_Computers_and_Electronics": 88, "K17_Mathematics": 88, "K10_Engineering_and_Technology": 82,
        "K22_Physics": 60,
        "A01_Artistic": 25, "A02_Conventional": 55, "A03_Enterprising": 48,
        "A04_Investigative": 90, "A05_Realistic": 55, "A06_Social": 38,
    },
    # --- Digital Media groups ---------------------------------------------- #
    "Digital Content": {
        "S29_Writing": 78, "S21_Reading_Comprehension": 70, "S05_Critical_Thinking": 62,
        "K04_Communications_and_Media": 85, "K07_Design": 82, "K12_Fine_Arts": 78,
        "K26_Sales_and_Marketing": 65, "K11_English_Language": 68,
        "A01_Artistic": 88, "A02_Conventional": 40, "A03_Enterprising": 60,
        "A04_Investigative": 45, "A05_Realistic": 42, "A06_Social": 62,
    },
    "Animation": {
        "S27_Technology_Design": 72, "S26_Systems_Design": 60, "S20_Programming": 45,
        "K07_Design": 88, "K12_Fine_Arts": 88, "K04_Communications_and_Media": 70,
        "K05_Computers_and_Electronics": 65,
        "A01_Artistic": 92, "A02_Conventional": 38, "A03_Enterprising": 45,
        "A04_Investigative": 50, "A05_Realistic": 55, "A06_Social": 48,
    },
    "Film": {
        "S29_Writing": 75, "S04_Coordination": 72, "S22_Planning": 70, "S24_Speaking": 68,
        "K04_Communications_and_Media": 85, "K12_Fine_Arts": 80, "K07_Design": 72,
        "A01_Artistic": 88, "A02_Conventional": 42, "A03_Enterprising": 58,
        "A04_Investigative": 48, "A05_Realistic": 52, "A06_Social": 65,
    },
    "Game": {
        "S20_Programming": 72, "S27_Technology_Design": 78, "S26_Systems_Design": 72,
        "S03_Complex_Problem_Solving": 70, "K07_Design": 82, "K12_Fine_Arts": 75,
        "K05_Computers_and_Electronics": 78, "K10_Engineering_and_Technology": 65,
        "A01_Artistic": 82, "A02_Conventional": 45, "A03_Enterprising": 50,
        "A04_Investigative": 65, "A05_Realistic": 58, "A06_Social": 50,
    },
    "Production": {
        "S04_Coordination": 80, "S22_Planning": 80, "S13_Management_of_Personnel_Resources": 75,
        "S16_Negotiation": 70, "S24_Speaking": 72, "K01_Administration_and_Management": 78,
        "K04_Communications_and_Media": 80, "K26_Sales_and_Marketing": 70,
        "A01_Artistic": 70, "A02_Conventional": 55, "A03_Enterprising": 78,
        "A04_Investigative": 48, "A05_Realistic": 50, "A06_Social": 72,
    },
    "Marketing": {
        "S19_Persuasion": 82, "S16_Negotiation": 75, "S24_Speaking": 78, "S29_Writing": 70,
        "S23_Social_Perceptiveness": 75, "K26_Sales_and_Marketing": 88,
        "K04_Communications_and_Media": 82, "K08_Economics_and_Accounting": 60,
        "A01_Artistic": 62, "A02_Conventional": 48, "A03_Enterprising": 85,
        "A04_Investigative": 50, "A05_Realistic": 42, "A06_Social": 80,
    },
    "New Media": {
        "S20_Programming": 60, "S27_Technology_Design": 68, "S29_Writing": 70, "S24_Speaking": 68,
        "K04_Communications_and_Media": 82, "K05_Computers_and_Electronics": 72, "K07_Design": 75,
        "K26_Sales_and_Marketing": 65,
        "A01_Artistic": 78, "A02_Conventional": 45, "A03_Enterprising": 65,
        "A04_Investigative": 58, "A05_Realistic": 50, "A06_Social": 68,
    },
    "Research": {
        "S05_Critical_Thinking": 82, "S18_Operations_Analysis": 75, "S21_Reading_Comprehension": 80,
        "S29_Writing": 78, "S14_Mathematics": 65, "K04_Communications_and_Media": 70,
        "K24_Psychology": 70, "K27_Sociology_and_Anthropology": 72, "K11_English_Language": 72,
        "A01_Artistic": 55, "A02_Conventional": 55, "A03_Enterprising": 45,
        "A04_Investigative": 85, "A05_Realistic": 45, "A06_Social": 60,
    },
    "Interactive Media": {
        "S27_Technology_Design": 78, "S26_Systems_Design": 70, "S20_Programming": 62,
        "K07_Design": 86, "K12_Fine_Arts": 82, "K05_Computers_and_Electronics": 72,
        "K04_Communications_and_Media": 72,
        "A01_Artistic": 88, "A02_Conventional": 42, "A03_Enterprising": 52,
        "A04_Investigative": 55, "A05_Realistic": 55, "A06_Social": 52,
    },
}

BASELINE = (38, 52)        # default requirement range for non-emphasized dims
LOW_RANGE = (10, 24)       # for clearly-irrelevant dims
JITTER = 5                 # +/- applied to emphasized targets


def clamp(v: float) -> int:
    return int(max(0, min(100, round(v))))


def build_vector(group: str) -> Dict[str, int]:
    profile = GROUP_PROFILES[group]
    vector: Dict[str, int] = {}
    for key in KEYS:
        if key in profile:
            vector[key] = clamp(profile[key] + random.randint(-JITTER, JITTER))
        elif key in LOW_RELEVANCE:
            vector[key] = clamp(random.randint(*LOW_RANGE))
        elif key.startswith("A"):
            # attitudes not specified -> moderate
            vector[key] = clamp(random.randint(40, 55))
        else:
            vector[key] = clamp(random.randint(*BASELINE))
    return vector


def generate_careers() -> List[Dict]:
    careers = []
    for meta in CAREERS_META:
        career = dict(meta)
        career["is_placeholder_name"] = meta["career_id"] in PLACEHOLDER_CODES
        career["competency_vector"] = build_vector(meta["career_group"])
        careers.append(career)
    return careers


# ----------------------------------------------------------------------------- #
# Course catalog (Feature 8.4) — keyed by competency_id.
# ----------------------------------------------------------------------------- #
PROVIDERS = ["Skooldio", "Datacamp", "Coursera", "Chula MOOC", "Udemy", "BorntoDev", "Future Skill"]


def generate_courses() -> Dict:
    with open(COMPETENCIES_FILE, encoding="utf-8") as f:
        comps = json.load(f)["competencies"]

    by_competency: Dict[str, List[Dict]] = {}
    counter = 1
    for c in comps:
        label = c["label_en"]
        n_courses = 2 if c["domain"] != "attitude" else 1
        courses = []
        for j in range(n_courses):
            provider = PROVIDERS[(counter + j) % len(PROVIDERS)]
            price = random.choice([0, 990, 1490, 1990, 2900, 3500])
            duration = random.choice([6, 10, 12, 16, 20, 30])
            level = ["Beginner", "Intermediate"][j % 2]
            courses.append(
                {
                    "course_id": f"CR{counter:03d}",
                    "title": f"{level} {label}",
                    "provider": provider,
                    "price_thb": price,
                    "duration_hours": duration,
                    "level": level,
                    "url": f"https://example.com/courses/CR{counter:03d}",
                    "affiliate": True,
                }
            )
            counter += 1
        by_competency[c["id"]] = courses

    return {
        "_meta": {
            "description": "Mock upskill catalog keyed by competency_id (Feature 8.4). "
            "Prices/providers are illustrative; affiliate links are mock.",
            "total_courses": counter - 1,
        },
        "by_competency": by_competency,
    }


def main() -> None:
    careers = generate_careers()
    courses = generate_courses()

    careers_payload = {
        "_meta": {
            "description": "78 mock careers (DT 36 + DM 42) with full 66-dim competency "
            "vectors, scale 0-100. Generated by generate_data.py (seed=42).",
            "source": "Names/groups DT01-DT23 & DM01-DM28 verbatim from Master Prompt "
            "Section 9.1; others are flagged placeholders. Vectors are plausible mocks "
            "pending CARIA paper Table 3.",
            "total": len(careers),
            "dt_count": sum(1 for c in careers if c["program"] == "DT"),
            "dm_count": sum(1 for c in careers if c["program"] == "DM"),
        },
        "careers": careers,
    }

    with open(DATA_DIR / "careers.json", "w", encoding="utf-8") as f:
        json.dump(careers_payload, f, ensure_ascii=False, indent=2)
    with open(DATA_DIR / "courses.json", "w", encoding="utf-8") as f:
        json.dump(courses, f, ensure_ascii=False, indent=2)

    print(f"Wrote careers.json ({len(careers)} careers, "
          f"{careers_payload['_meta']['dt_count']} DT + {careers_payload['_meta']['dm_count']} DM)")
    print(f"Wrote courses.json ({courses['_meta']['total_courses']} courses)")


if __name__ == "__main__":
    main()
