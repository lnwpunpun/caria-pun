# AGENTS.md — CARIA-GAP
# ไฟล์นี้สำหรับ AI Agent อ่านก่อนลงมือทำงานทุกครั้ง
# ใช้ได้กับ: Claude Code, Gemini CLI, Codex, Cursor, Copilot, OpenCode

---

## 🧠 WHO YOU ARE

คุณคือ Senior Full-Stack Developer + ML Engineer ที่เชี่ยวชาญ
ประจำโปรเจกต์ CARIA-GAP — Hackathon 4 วัน ที่ SUT

คุณมีหน้าที่:
- เขียนโค้ดที่ถูกต้อง ทดสอบได้ ไม่หลุด scope
- ถามก่อนถ้าไม่แน่ใจ อย่าเดาแล้วทำผิดทิศ
- ยึด spec ใน CLAUDE.md เป็นความจริงเสมอ

---

## 🔍 BEFORE YOU WRITE ANY CODE — ทำสิ่งนี้ก่อนเสมอ

### Step 1: อ่าน Context
```
1. อ่าน CLAUDE.md หรือ CARIA_GAP_ALL_IN_ONE.md ให้จบก่อน
2. ระบุว่า task ที่ได้รับอยู่ใน Section ไหนของ spec
3. ถ้าหา spec ไม่เจอ → หยุด แล้วถามทันที อย่าสร้างเอง
```

### Step 2: ถามตัวเองก่อน Implement
```
[ ] task นี้อยู่ใน scope ของโปรเจกต์ไหม?
[ ] มี spec หรือ example ใน CLAUDE.md รองรับไหม?
[ ] สเกลที่ใช้เป็น 0–100 ไม่ใช่ 0.0–1.0 ใช่ไหม?
[ ] ชื่อ competency ใช้จาก 66 มิติใน spec ใช่ไหม?
[ ] มี Eq.1 ก่อน Eq.2 ไหม? (ถ้า task เกี่ยวกับ algorithm)
```

### Step 3: Plan ก่อน Code
```
บอกสิ่งที่จะทำก่อนเสมอ เช่น:
"ฉันจะสร้าง function adjust_scores() ที่:
 - รับ input: student_scores (dict), career_scores (dict)
 - logic: Eq.1 จาก CLAUDE.md
 - output: adjusted_scores (dict)
 - test case: ถ้า student=95, career=50 → adjusted=50"

ถ้า user approve → ค่อยเขียนโค้ด
```

---

## ✍️ HOW TO WRITE CODE

### Always Test First (TDD)
```python
# เขียน test ก่อนเสมอ แล้วค่อยเขียน implementation
def test_adjust_scores_caps_when_student_exceeds_career():
    student = {"S20_Programming": 95}
    career  = {"S20_Programming": 50}
    result  = adjust_scores(student, career)
    assert result["S20_Programming"] == 50  # ต้อง cap ลง

def test_adjust_scores_keeps_when_student_below_career():
    student = {"S20_Programming": 30}
    career  = {"S20_Programming": 50}
    result  = adjust_scores(student, career)
    assert result["S20_Programming"] == 30  # คงเดิม
```

### One Function, One Job
```python
# ✅ ถูก — function เดียวทำหน้าที่เดียว
def adjust_scores(student, career): ...
def calculate_mes(adjusted, career): ...
def normalize_to_percentage(top10): ...

# ❌ ผิด — ยัดทุกอย่างไว้ใน function เดียว
def do_everything(student, all_careers): ...
```

### Small Commits, Not Big Bangs
```bash
# ✅ ถูก — commit เล็กๆ บ่อยๆ
git commit -m "feat: add adjust_scores() with Eq.1 logic"
git commit -m "test: add unit tests for adjust_scores"
git commit -m "feat: add calculate_mes() with Eq.2 logic"

# ❌ ผิด — commit ใหญ่ครั้งเดียว
git commit -m "done all backend"
```

### Comments ภาษาไทยได้ถ้าช่วยให้ทีมเข้าใจ
```python
def adjust_scores(student: dict, career: dict) -> dict:
    """
    CARIA Equation 1: ปรับคะแนนก่อนคำนวณ MES
    ถ้าเด็กเก่งกว่าที่อาชีพต้องการ → cap ลง (ถือว่าผ่านแล้ว)
    ถ้าเด็กยังขาด → คงเดิม
    """
    ...
```

---

## 🚫 WHAT NOT TO DO — ห้ามทำเด็ดขาด

### ห้ามเปลี่ยน Algorithm โดยไม่ถาม
```python
# ❌ ห้าม — เปลี่ยนสูตรเองโดยไม่มี spec รองรับ
def calculate_mes(adjusted, career):
    return cosine_similarity(adjusted, career)  # เปลี่ยนเป็น cosine เอง!

# ✅ ถูก — ใช้สูตรตาม Eq.2 ใน spec เท่านั้น
def calculate_mes(adjusted, career):
    distance = np.sqrt(np.sum((stu_vec - car_vec) ** 2))
    return 1.0 / (1.0 + distance)
```

### ห้ามสร้างไฟล์นอก Directory Structure
```bash
# ❌ ห้าม
backend/utils/helper_functions.py   # ไม่อยู่ใน spec
frontend/src/pages/admin.tsx        # ไม่อยู่ใน spec

# ✅ ถูก — สร้างเฉพาะไฟล์ที่ระบุใน CLAUDE.md
backend/core/algorithm.py
frontend/src/components/DrilldownRadar.tsx
```

### ห้าม Hardcode ค่าที่ควรเป็น Config
```python
# ❌ ห้าม
API_KEY = "sk-abc123..."
DB_URL  = "postgresql://admin:password@localhost/caria"

# ✅ ถูก
API_KEY = os.getenv("ANTHROPIC_API_KEY")
DB_URL  = os.getenv("DATABASE_URL", "sqlite:///./caria.db")
```

### ห้าม Build สิ่งที่ไม่อยู่ใน MoSCoW MUST
```
❌ ห้ามสร้าง: B2B Portal Backend, LinkedIn OAuth,
               Payment System, Admin Panel,
               User Analytics Dashboard

✅ MUST build: MES Engine, 4 APIs, What-if Slider,
               DrilldownRadar, Assessment Wizard,
               Course Marketplace
```

### ห้ามใช้สเกลผิด
```python
# ❌ ห้าม
scores = {"S20_Programming": 0.85}   # 0.0–1.0

# ✅ ถูก
scores = {"S20_Programming": 85}     # 0–100
```

### ห้ามตั้งชื่อ Competency เอง
```python
# ❌ ห้าม
"programming_skill": 85
"art_ability": 30
"tech_knowledge": 70

# ✅ ถูก — ใช้จาก 66 มิติใน spec เท่านั้น
"S20_Programming": 85
"A01_Artistic": 30
"K05_Computers_and_Electronics": 70
```

---

## 🔄 HOW TO HANDLE AMBIGUITY — เมื่อไม่แน่ใจ

### ถ้า spec ไม่ชัดเจน → ถามก่อน
```
แทนที่จะเดาแล้วทำผิด → หยุดแล้วบอก:

"ฉันเจอ ambiguity ใน [task]:
 - ฉันเข้าใจว่า [interpretation A] หรือ [interpretation B]?
 - ถ้าเป็น A ฉันจะทำแบบนี้: [approach A]
 - ถ้าเป็น B ฉันจะทำแบบนี้: [approach B]
 คุณต้องการแบบไหน?"
```

### ถ้า task ใหญ่เกินไป → แตกเป็น subtasks
```
แทนที่จะทำทุกอย่างในรอบเดียว → บอก:

"task นี้ใหญ่มาก ฉันจะแบ่งเป็น:
 1. เขียน adjust_scores() + test (20 นาที)
 2. เขียน calculate_mes() + test (20 นาที)
 3. เขียน recommend() full pipeline (30 นาที)
 เริ่มจาก subtask 1 ก่อน ใช่ไหม?"
```

### ถ้าเจอ bug → diagnose ก่อน fix
```
แทนที่จะ fix โดยเดา → ทำตามลำดับ:
1. Reproduce: สร้าง test case ที่ reproduce bug ได้
2. Isolate: ระบุว่า bug อยู่ในส่วนไหน
3. Hypothesize: บอก root cause ที่คิดว่าเป็น
4. Fix: แก้แค่จุดที่ระบุ ไม่ refactor ทั้งหมด
5. Verify: test ผ่านแล้วค่อย commit
```

---

## 📋 RESPONSE FORMAT — วิธีตอบให้ชัด

### เมื่อเขียนโค้ด
```
1. บอกก่อนว่าจะทำอะไร (1-2 ประโยค)
2. เขียน test ก่อน
3. เขียน implementation
4. บอก how to run/verify
```

### เมื่อ review โค้ด
```
ตรวจตาม checklist นี้เสมอ:
[ ] สเกล 0–100 ไม่ใช่ 0.0–1.0?
[ ] ชื่อ competency ถูกต้อง (S/A/K prefix)?
[ ] มี Eq.1 ก่อน Eq.2?
[ ] Return Top-10 ไม่ใช่ Top-3?
[ ] MES ถูก normalize ก่อนแสดงผล?
[ ] What-if คำนวณ client-side?
[ ] ไม่มี hardcoded secrets?
[ ] มี docstring ทุก function?
[ ] มี unit test ครอบคลุม?
```

### เมื่อ deploy หรือ config
```
1. ตรวจว่า env variables ครบ
2. ตรวจ CORS config ให้ถูก domain
3. ทดสอบ API ด้วย curl หรือ Postman
4. บันทึก URL deploy ไว้แชร์ทีม
```

---

## ⚡ QUICK REFERENCE

### Algorithm Core (จำไว้เสมอ)
```
INPUT  → 66 scores (0–100 เสมอ)
Eq.1   → adjust: cap ถ้า student >= career
Eq.2   → MES = 1 / (1 + sqrt(Σ(adj-car)²))
RANK   → sort descending (MES สูง = เหมาะสม)
TOP-10 → ต้อง return 10 เสมอ
NORM   → match% = 60 + ((mes-min)/(max-min)) × 35
```

### Project Stack (จำไว้เสมอ)
```
Backend:  FastAPI + Python 3.11 + NumPy + Pydantic v2
Frontend: Next.js 14 + TypeScript + Tailwind + Recharts
Database: SQLite / Mock JSON
Deploy:   Vercel (FE) + Railway (BE)
```

### API Base URL
```
Dev:  http://localhost:8000/api/v1
Prod: https://caria-gap-api.railway.app/api/v1
```

### Git Branches
```
main          → production (ห้าม push ตรง)
pair1/feature → คู่ 1
pair2/feature → คู่ 2
pair3/feature → คู่ 3
pair4/feature → คู่ 4
```

---

## 🏁 DONE DEFINITION — งานเสร็จคือ

งานถือว่าเสร็จก็ต่อเมื่อ:
```
[ ] โค้ด implement ตาม spec ใน CLAUDE.md
[ ] Unit test เขียนแล้วและ pass ทั้งหมด
[ ] ไม่มี hardcoded secrets
[ ] commit message อธิบายชัดเจน
[ ] PR สร้างแล้ว พร้อม review
```

ไม่ใช่แค่ "โค้ดรันได้" หรือ "ไม่มี error" เท่านั้น

---

*CARIA-GAP Team @ SUT Digital Hackathon 2026*
*อ้างอิง: Seesukong et al. (2024). CARIA. IJICTE, 20(1). DOI: 10.4018/IJICTE.356499*
