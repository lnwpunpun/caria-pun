# CONTEXT.md — CARIA-GAP Project Context
# ไฟล์นี้ใช้ส่งให้ AI ตัวใดก็ได้ (Gemini, Claude, ChatGPT) เพื่อให้เข้าใจโปรเจกต์

## What is this project?
CARIA-GAP เป็นระบบวิเคราะห์ช่องว่างสมรรถนะและจับคู่อาชีพดิจิทัล
พัฒนาต่อยอดจากงานวิจัย "CARIA" ของ SUT สำหรับ Digital Hackathon 4 วัน

## Original Research (CARIA)
- Paper: "CARIA: A Personalized Career Recommender Based on Individual Competency Similarity Measure"
- Published: IJICTE Volume 20, Issue 1, 2024 (CC-BY 4.0)
- Authors: Supaluck Seesukong, Thara Angskun, et al. — SUT Thailand
- Original Tech: Java + MySQL
- Performance: Precision@10 = 0.83 (beats GPT-4, Naive Bayes, Decision Tree, MLP)

## What CARIA-GAP adds (our innovation)
1. Hybrid Assessment: Resume AI Parser + Mini Quiz (ลดเวลาจาก 15 นาที → 3 นาที)
2. 3-Axis Drill-down Radar Chart (แทนกราฟ 66 แท่งที่อ่านยาก)
3. What-if Slider: ปรับ skill → เห็น career ranking เปลี่ยน real-time
4. Upskill Marketplace: แนะนำคอร์สปิด gap + affiliate business model
5. B2B HR Portal: Figma mockup only (ไม่ build backend)

## Core Algorithm (ห้ามเปลี่ยน)

### Equation 1 — Score Adjustment (ต้องทำก่อน Eq.2 เสมอ)
```
C'_stu = C_car    if C_stu >= C_car   (cap ลง = ทักษะผ่านแล้ว)
C'_stu = C_stu    if C_stu < C_car    (คงเดิม = ยังขาด)
```

### Equation 2 — Modified Euclidean Similarity (MES)
```
MES(C'_stu, C_car) = 1 / (1 + sqrt( Σ (C'_stu_i - C_car_i)² ))
```
- n = 66 dimensions (31 skills + 6 attitudes + 29 knowledge)
- Score scale: 0–100 (NOT 0.0–1.0)
- MES raw value: ~0.15–0.25 → must normalize to 60–95% for display

## 66 Competency Dimensions
### Skills (31): S01_Active_Learning through S31_Quality_Control_Analysis
### Attitudes (6): A01_Artistic, A02_Conventional, A03_Enterprising, A04_Investigative, A05_Realistic, A06_Social
### Knowledge (29): K01_Administration_and_Management through K29_Transportation

## Career Data
- DT (Digital Technology): 36 careers in 6 groups
- DM (Digital Media): 42 careers in 9 groups
- Total: 78 careers, each with 66-dimension competency vector

## Tech Stack
- Frontend: Next.js 14 + TypeScript + Tailwind + shadcn/ui + Recharts
- Backend: FastAPI + Python 3.11 + NumPy + Pydantic v2
- Database: SQLite / Mock JSON
- Deploy: Vercel (FE) + Railway (BE)

## Team Structure (8 people, 4 pairs)
- Pair 1: Core Algorithm + Backend (FastAPI, MES engine)
- Pair 2: Data Visualization + Dashboard (Recharts, Radar, Slider)
- Pair 3: Frontend + Flow (Next.js, Assessment, Marketplace)
- Pair 4: UX/Pitch + Business (Figma, Pitch deck, BMC)

## Timeline
- Day 1 (Mon): Foundation — schema, wireframe, MES engine
- Day 2 (Tue): Core Build — API working, Radar chart, What-if Slider
- Day 3 (Wed): Polish + Deploy — E2E test, slides, demo video
- Day 4 (Thu): Pitch Day — Semi-final AM, Final PM (7min + Q&A 5min)

## Scoring Criteria
- Desirability 30%: ความต้องการของกลุ่มเป้าหมาย
- Feasibility 30%: ความเป็นไปได้ของการสร้างจริง
- Viability 25%: ความยั่งยืนและนำไปต่อยอด
- Presentation 15%: การนำเสนอและตอบคำถาม

## Critical Constraints
1. Scale: 0–100 (NOT 0.0–1.0)
2. Must use 66 competencies from paper (NOT custom skill names)
3. Must run Eq.1 before Eq.2 always
4. Return Top-10 careers (NOT Top-3)
5. Normalize MES before display
6. What-if calculation = client-side (NOT API per slider move)
7. B2B Portal = Figma only (NO backend code)
8. Must cite paper when claiming precision
