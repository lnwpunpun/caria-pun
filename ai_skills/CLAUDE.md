# CLAUDE.md — CARIA-GAP Hackathon Project
# Claude Code จะอ่านไฟล์นี้อัตโนมัติก่อนทำงานทุกครั้ง

## Project Overview
CARIA-GAP = ระบบวิเคราะห์ช่องว่างสมรรถนะและจับคู่อาชีพดิจิทัล
ต่อยอดจากงานวิจัย CARIA (Precision@10 = 0.83) ของ SUT
Hackathon 4 วัน (1-4 มิ.ย. 2569) — ทีม 8 คน (DT 6 + DC 2)

## Tech Stack (ห้ามเปลี่ยน)
- Frontend: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- Charts: Recharts (RadarChart, BarChart)
- Backend: FastAPI + Python 3.11 + Pydantic v2
- Math: NumPy
- Database: SQLite / Mock JSON (local-first)
- Deploy: Vercel (FE) + Railway (BE)

## Critical Rules (ฝ่าฝืนข้อใดข้อหนึ่ง = ระบบพัง)

### Rule 1: สเกลคะแนน = 0–100 เท่านั้น
ห้ามใช้ 0.0–1.0 เด็ดขาด ทุก competency score ต้องเป็น integer 0–100
```python
# ✅ ถูก
score: int = Field(ge=0, le=100)
# ❌ ผิด
score: float = Field(ge=0.0, le=1.0)
```

### Rule 2: ต้องใช้ 66 Competencies จาก paper เท่านั้น
Skills 31 มิติ: S01_Active_Learning ... S31_Quality_Control_Analysis
Attitudes 6 มิติ: A01_Artistic ... A06_Social
Knowledge 29 มิติ: K01_Administration_and_Management ... K29_Transportation

```python
# ✅ ถูก
"S20_Programming": 85
# ❌ ผิด — ห้ามตั้งชื่อเอง
"frontend_dev": 0.85
```

### Rule 3: ต้อง Adjust ก่อน MES เสมอ (Eq.1 → Eq.2)
```python
# Eq.1 — MUST run before Eq.2
def adjust(c_stu, c_car):
    return c_car if c_stu >= c_car else c_stu

# Eq.2 — MES
def mes(adjusted, career):
    dist = sqrt(sum((adj_i - car_i)^2))
    return 1 / (1 + dist)
```
ห้ามข้าม Eq.1 เด็ดขาด ถ้าข้าม → ผล recommendation ผิดทั้งหมด

### Rule 4: ส่ง Top-10 เสมอ (ไม่ใช่ Top-3)
API ต้อง return 10 careers — UI โชว์ Top-3 เด่น + ที่เหลือเป็น list

### Rule 5: Normalize MES → Match %
MES คืนค่า 0.15–0.25 → ห้ามเอา ×100 ตรงๆ
```python
match_% = 60 + ((mes - min_mes) / (max_mes - min_mes)) * 35
# ผลลัพธ์: Top-1 ≈ 95%, Top-10 ≈ 60%
```

### Rule 6: What-if Slider คำนวณ Client-side
ห้ามยิง API ทุกครั้งที่ slider เลื่อน — ใช้ TypeScript คำนวณ MES บน browser

## File Naming Convention
- Components: PascalCase → `DrilldownRadar.tsx`
- Utils/lib: camelCase → `mesClient.ts`
- API routes: kebab-case → `gap-analysis.py`
- Data files: snake_case → `mock_careers.json`

## Code Style
- Python: Black formatter, type hints required
- TypeScript: Strict mode, no `any`
- ใช้ Thai comments ได้ถ้าช่วยให้ทีมเข้าใจ
- ทุก function ต้องมี docstring อธิบายว่าทำอะไร

## Git Workflow
- main branch = production (ห้าม push ตรง)
- แต่ละคู่ทำบน branch: pair1/feature-name, pair2/feature-name
- PR review โดยอีกคู่ก่อน merge

## API Base URL
- Dev: http://localhost:8000/api/v1
- Prod: https://caria-gap-api.railway.app/api/v1

## Key Endpoints
- POST /api/v1/assessment/submit
- GET  /api/v1/recommendations/{user_id}
- GET  /api/v1/gap-analysis/{user_id}/{career_id}
- POST /api/v1/simulate

## Testing
- `pytest backend/tests/` ก่อน push ทุกครั้ง
- test_algorithm.py ต้อง pass: Eq.1 adjust, Eq.2 MES, Top-10 ranking

## Reference
Paper: Seesukong et al. (2024). CARIA. IJICTE, 20(1). DOI: 10.4018/IJICTE.356499
License: CC-BY 4.0 — ต้อง cite ทุกครั้งที่อ้าง precision
