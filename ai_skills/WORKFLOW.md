# WORKFLOW.md — วิธีใช้ .md Files กับ AI Agent ทั้งหมด
# สำหรับทีม CARIA-GAP Hackathon (1-4 มิ.ย. 2569)

---

## 📦 ไฟล์ .md ทั้งหมดที่ต้องมี (7 ไฟล์)

```
caria-gap/
├── CLAUDE.md              ← สำหรับ Claude Code (อ่านอัตโนมัติ)
├── CONTEXT.md             ← สำหรับ AI ทุกตัว (Gemini, Claude web)
├── AGENT-PAIR1.md         ← คู่ 1: Backend + Algorithm
├── AGENT-PAIR2.md         ← คู่ 2: Data Viz + Dashboard
├── AGENT-PAIR3.md         ← คู่ 3: Frontend + Flow
├── AGENT-PAIR4.md         ← คู่ 4: UX/Pitch + Business
└── MASTER_PROMPT.md       ← Prompt ฉบับเต็ม 17 sections (อ้างอิง)
```

---

## 🛠️ เครื่องมือ AI ที่ทีมมี

| เครื่องมือ | ใครใช้ | ใช้ทำอะไร | ไฟล์ที่ต้องป้อน |
|-----------|--------|----------|---------------|
| **Claude Code Pro** | คู่ 1, 2, 3 | เขียนโค้ดจริง ทั้ง FE+BE | CLAUDE.md (auto) + AGENT-PAIRx.md |
| **Gemini Pro web** | ทุกคู่ | วิเคราะห์ ถามคำถาม ช่วยคิด | CONTEXT.md + AGENT-PAIRx.md |
| **Antigravity 2.0** | คู่ 1, 2, 3 | Agent-in-browser สำหรับ Claude/Gemini | CONTEXT.md (paste เข้า) |
| **Claude.ai (web)** | คู่ 4, backup | Pitch writing, BMC, analysis | CONTEXT.md + AGENT-PAIR4.md |

---

## 🔄 Workflow ทีละขั้น

### ขั้นที่ 0: Setup (ทำครั้งเดียวก่อน Hackathon)

```bash
# 1. Clone repo
git clone https://github.com/your-team/caria-gap.git
cd caria-gap

# 2. วาง CLAUDE.md ที่ root ของ repo (Claude Code อ่านอัตโนมัติ)
cp CLAUDE.md ./CLAUDE.md

# 3. วาง CONTEXT.md ที่ root ด้วย
cp CONTEXT.md ./CONTEXT.md

# 4. แต่ละคู่เก็บ AGENT-PAIRx.md ไว้ในเครื่อง
# ไม่ต้องอยู่ใน repo — ใช้ paste เข้า AI เวลาเริ่มงาน
```

---

### ขั้นที่ 1: เปิด AI Agent (ทำทุกวันตอนเริ่มงาน)

#### 🔵 ถ้าใช้ Claude Code Pro:
```bash
# Claude Code อ่าน CLAUDE.md อัตโนมัติ
# แค่ cd เข้า project folder แล้วเริ่มสั่งงาน

cd caria-gap
claude

# สั่งงานตรงๆ เช่น:
> "อ่าน AGENT-PAIR1.md แล้วเริ่มเขียน algorithm.py ตาม spec"
> "สร้าง FastAPI endpoint POST /assessment/submit ตาม schemas ใน CLAUDE.md"
> "เขียน unit test สำหรับ Eq.1 + Eq.2"
```

#### 🟡 ถ้าใช้ Gemini Pro web:
```
1. เปิด Gemini Pro web
2. Paste CONTEXT.md ทั้งไฟล์เป็นข้อความแรก
3. พิมพ์: "อ่าน context ด้านบนให้เข้าใจก่อน ห้ามออกนอกข้อกำหนด"
4. Paste AGENT-PAIRx.md (ของคู่ตัวเอง) เป็นข้อความที่ 2
5. พิมพ์: "เริ่มงาน task แรกใน priority list"
```

#### 🟣 ถ้าใช้ Antigravity 2.0:
```
1. เปิด Antigravity extension
2. ตั้ง System Prompt = เนื้อหาจาก CONTEXT.md
3. ตั้ง Custom Instructions = เนื้อหาจาก AGENT-PAIRx.md
4. ใช้งานปกติ — Agent จะทำงานภายใน context ที่กำหนด
```

#### 🟢 ถ้าใช้ Claude.ai (web chat):
```
1. เปิด Claude.ai
2. สร้าง Project ใหม่ชื่อ "CARIA-GAP"
3. อัป CONTEXT.md + AGENT-PAIRx.md เป็น Project Knowledge
4. เริ่ม chat — Claude จะอ่าน context อัตโนมัติ
```

---

### ขั้นที่ 2: สั่งงาน AI ให้ถูกวิธี

#### ❌ วิธีผิด (AI จะหลงทาง):
```
"ช่วยเขียน career recommender system ให้หน่อย"
→ AI จะสร้างโค้ดมั่วๆ ไม่ตรง CARIA spec
```

#### ✅ วิธีถูก (เจาะจง + อ้าง spec):
```
"ตาม AGENT-PAIR1.md task #1:
เขียน algorithm.py ที่มี 3 functions:
1. adjust_scores() ตาม Eq.1 ใน CLAUDE.md
2. calculate_mes() ตาม Eq.2 ใน CLAUDE.md
3. recommend() ที่ return Top-10 + normalize match %
ใช้ NumPy, สเกล 0-100, competency names ตาม Section 2 ของ CONTEXT.md"
```

---

### ขั้นที่ 3: ตรวจสอบ output ของ AI

ทุกครั้งที่ AI สร้างโค้ด ให้เช็ค 5 ข้อนี้ก่อน commit:

```
[ ] สเกลเป็น 0-100 ไม่ใช่ 0.0-1.0?
[ ] ใช้ชื่อ competency จาก paper (S01_Active_Learning) ไม่ใช่ชื่อเอง?
[ ] มี Eq.1 (adjust) ก่อน Eq.2 (MES)?
[ ] Return Top-10 ไม่ใช่ Top-3?
[ ] MES ถูก normalize ก่อนแสดงผล?
```

---

## 🗂️ เทคนิคเสริม

### DeepWiki — ใช้เมื่อไหร่
```
เมื่อ: repo มีโค้ดเยอะแล้ว (Day 2-3) แล้วต้องการให้ AI เข้าใจโครงสร้างทั้งหมด
วิธี: ไปที่ deepwiki.com → ใส่ GitHub repo URL → ได้ wiki อัตโนมัติ
ผล: AI อ่าน wiki แล้วเข้าใจ codebase ทั้งโปรเจกต์
เหมาะกับ: คู่ที่ต้องแก้โค้ดของคู่อื่น หรือ integrate ข้าม pair
```

### Grill with Docs — ใช้เมื่อไหร่
```
เมื่อ: ต้องการให้ AI อ่าน paper CARIA ฉบับเต็ม
วิธี: อัป PDF ของ paper เข้า Claude/Gemini แล้วถามคำถามเจาะจง
ผล: AI ตอบจากเนื้อหาจริงใน paper ไม่ใช่ hallucinate
เหมาะกับ: ตรวจสอบว่า career vector ถูกต้อง, อ้าง precision ถูกวิธี
```

---

## 📋 Daily Routine สำหรับแต่ละคู่

### เช้า (8:30)
1. `git pull origin main` — ดึงโค้ดล่าสุด
2. เปิด AI agent + paste AGENT-PAIRx.md (ถ้าใช้ web)
3. ดู task list ใน AGENT file — ทำ task ถัดไป
4. เขียนโค้ด + ให้ AI review

### บ่าย (13:00)
5. Push branch + สร้าง PR
6. คู่อื่น review PR (ใช้ AI ช่วย review ได้)
7. Merge เข้า main
8. ทดสอบ integration กับคู่อื่น

### เย็น (16:00+)
9. Update progress ใน shared doc
10. Plan tasks สำหรับวันถัดไป

---

## ⚡ Quick Reference: AI Prompt Templates

### สำหรับเขียนโค้ด:
```
"ตาม spec ใน CLAUDE.md Section [X]:
เขียน [function/component] ที่ทำ [อะไร]
- Input: [format]
- Output: [format]
- Constraints: [ข้อจำกัด]
ภาษา: [Python/TypeScript]"
```

### สำหรับ debug:
```
"โค้ดนี้ควรจะ [ทำอะไร] ตาม Eq.[1/2] ใน CLAUDE.md
แต่ผลลัพธ์ออกมา [ผิดยังไง]
ช่วยหาจุดผิดและแก้ให้ตรง spec"
```

### สำหรับ review:
```
"Review โค้ดนี้ตาม CLAUDE.md rules:
1. สเกล 0-100?
2. ใช้ 66 competencies ถูกชื่อ?
3. มี Eq.1 ก่อน Eq.2?
4. Return Top-10?
5. Normalize MES?
ถ้าผิดข้อไหน บอกพร้อมวิธีแก้"
```

### สำหรับ pitch:
```
"ตาม AGENT-PAIR4.md pitch structure:
เขียน talking points สำหรับ Slide [X]: [หัวข้อ]
ต้อง cite CARIA paper, ใช้ตัวเลขจาก Business Numbers section
ภาษาไทย, 30 วินาทีต่อสไลด์"
```

---

## 🎯 สรุป: ใครใช้ไฟล์อะไร

| คู่ | Claude Code | Gemini/Antigravity | Claude Web |
|-----|------------|-------------------|------------|
| คู่ 1 | CLAUDE.md (auto) + AGENT-PAIR1.md | CONTEXT.md + AGENT-PAIR1.md | backup |
| คู่ 2 | CLAUDE.md (auto) + AGENT-PAIR2.md | CONTEXT.md + AGENT-PAIR2.md | backup |
| คู่ 3 | CLAUDE.md (auto) + AGENT-PAIR3.md | CONTEXT.md + AGENT-PAIR3.md | backup |
| คู่ 4 | ไม่ใช้ | CONTEXT.md + AGENT-PAIR4.md | AGENT-PAIR4.md (หลัก) |

**กฎเหล็ก**: ทุกคู่ต้องอ่าน CONTEXT.md ก่อนเริ่มงานวันแรก ไม่ว่าจะใช้ AI ตัวไหน
