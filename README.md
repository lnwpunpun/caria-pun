# CARIA-GAP

ระบบแนะนำอาชีพและการวิเคราะห์ช่องว่างสมรรถนะ (Career Recommendation and Competency Gap Analysis System) ที่พัฒนาขึ้นตามแบบจำลอง **CARIA Modified Euclidean Similarity model** (66 มิติ, คะแนน 0-100)

โปรเจกต์นี้แบ่งออกเป็น 2 ส่วนหลัก:
1. **Backend**: FastAPI (Python) สำหรับประมวลผลอัลกอริทึม CARIA
2. **Frontend**: Next.js (React + TypeScript + Tailwind CSS v4 + Three.js) สำหรับการแสดงผลแบบ Interactive 3D และจำลองสถานการณ์

---

## 🛠️ สิ่งที่ต้องติดตั้งก่อนเริ่มต้น (Prerequisites)

ก่อนที่จะรันโปรเจกต์นี้ ตรวจสอบให้แน่ใจว่าเครื่องคอมพิวเตอร์ของคุณติดตั้งซอฟต์แวร์ต่อไปนี้เรียบร้อยแล้ว:

1. **Python (เวอร์ชัน 3.10 ขึ้นไป)**
   - ดาวน์โหลดได้ที่: [python.org](https://www.python.org/downloads/)
   - *หมายเหตุ: ตอนติดตั้งบน Windows อย่าลืมติ๊กเลือก "Add Python to PATH"*

2. **Node.js (เวอร์ชัน 18.0.0 หรือสูงกว่า)**
   - แนะนำเวอร์ชัน LTS ล่าสุด (เช่น v20.x หรือ v22.x)
   - ดาวน์โหลดได้ที่: [nodejs.org](https://nodejs.org/)

3. **pnpm (Package Manager)**
   - โปรเจกต์นี้ใช้ `pnpm` ในการจัดการ library ฝั่ง Frontend
   - ติดตั้งได้ง่ายๆ ผ่าน cmd/PowerShell:
     ```bash
     npm install -g pnpm
     ```

---

## 🚀 ขั้นตอนการติดตั้งและรันโปรเจกต์ (Installation & Running)

เพื่อให้โปรเจกต์ทำงานได้อย่างสมบูรณ์ ต้องเริ่มรันทั้งฝั่ง **Backend** และ **Frontend** ควบคู่กันตามขั้นตอนต่อไปนี้:

### 1. วิธีติดตั้งและรัน Backend (FastAPI)

1. เปิด Terminal / Command Prompt แล้วเข้าไปที่โฟลเดอร์ `backend`:
   ```bash
   cd backend
   ```

2. สร้าง Virtual Environment เพื่อแยกโมดูลของ Python (แนะนำเพื่อป้องกันการชนกันของเวอร์ชัน):
   ```bash
   python -m venv venv
   ```

3. เปิดใช้งาน (Activate) Virtual Environment:
   * **สำหรับ Windows (PowerShell):**
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
     *(หากติดปัญหา Execution Policy ให้ใช้คำสั่ง `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process` ก่อนรันสคริปต์)*
   * **สำหรับ Windows (CMD):**
     ```cmd
     .\venv\Scripts\activate.bat
     ```
   * **สำหรับ macOS / Linux:**
     ```bash
     source venv/bin/activate
     ```

4. ติดตั้ง Libraries ทั้งหมดที่จำเป็น:
   ```bash
   pip install -r requirements.txt
   ```

5. เริ่มต้นรันเซิร์ฟเวอร์ Backend:
   ```bash
   uvicorn main:app --reload
   ```
   *เซิร์ฟเวอร์จะเริ่มต้นทำงานที่: `http://127.0.0.1:8000`*
   *คุณสามารถเข้าชม Interactive API Documentation (Swagger UI) ได้ที่: `http://127.0.0.1:8000/docs`*

---

### 2. วิธีติดตั้งและรัน Frontend (Next.js)

1. เปิด Terminal ใหม่ (ไม่ต้องปิดอันเดิมที่รัน Backend) แล้วเข้าไปที่โฟลเดอร์ `frontend`:
   ```bash
   cd frontend
   ```

2. ติดตั้ง Node.js Dependencies ด้วย `pnpm`:
   ```bash
   pnpm install
   ```

3. เริ่มต้นรันเว็บแอปพลิเคชันในโหมดพัฒนา (Development):
   ```bash
   pnpm dev
   ```
   *หน้าเว็บจะทำงานที่: `http://localhost:3000`*

---

## ⚙️ การตั้งค่าสภาพแวดล้อม (Environment Variables) - ทางเลือกเพิ่มเติม

โดยปกติระบบจะตั้งค่าเชื่อมต่อระหว่าง Frontend และ Backend แบบอัตโนมัติที่ `http://127.0.0.1:8000` 

หากคุณต้องการเปลี่ยนที่อยู่ของ API (เช่น ย้าย Backend ไปรันเครื่องอื่น หรือขึ้น Cloud) ให้ทำตามขั้นตอนดังนี้:
1. สร้างไฟล์ชื่อ `.env.local` ในโฟลเดอร์ `frontend/`
2. ใส่การเชื่อมโยง API ปลายทาง:
   ```env
   NEXT_PUBLIC_API_BASE=https://api.yourdomain.com
   ```

---

## 💡 ระบบจำลองออฟไลน์ (Offline Fallback Mode)
* โปรเจกต์นี้ได้รับการออกแบบมาให้ทำงานได้แม้ไม่เปิดใช้งาน Backend (เช่น สำหรับการสาธิตอย่างรวดเร็ว)
* หากเชื่อมต่อกับ Backend ไม่ได้ ระบบจะเปลี่ยนไปใช้ **Mock Data** สำหรับผลการแนะนำอาชีพและการวิเคราะห์ช่องว่างความสามารถโดยอัตโนมัติ ทำให้ผู้ใช้ยังสามารถเล่นหน้าเว็บและเห็นการทำงานของ 3D Interactive ได้อย่างไม่มีสะดุด

---

## 📦 โครงสร้างโปรเจกต์ที่สำคัญ (Key Folder Structure)

```text
caria-gap/
├── backend/                  # ส่วนประมวลผล API และระบบคำนวณ CARIA
│   ├── main.py               # จุดเริ่มต้นของ FastAPI
│   ├── requirements.txt      # รายการ Library ของ Python
│   ├── routers/              # เส้นทาง API (Assessment, Gap Analysis, Recommendations)
│   └── models/               # การจัดการข้อมูลและคำนวณทางคณิตศาสตร์
│
├── frontend/                 # หน้าตาเว็บไซต์แบบ Interactive
│   ├── src/
│   │   ├── components/       # UI Components (3D Sphere, Simulator, Charts)
│   │   └── lib/              # ฟังก์ชันติดต่อ API และ Mock Data
│   ├── package.json          # ไฟล์กำหนดสคริปต์และ Module ฝั่ง Frontend
│   └── pnpm-lock.yaml        # บันทึกเวอร์ชันที่ถูกต้องของ Frontend
│
└── README.md                 # คู่มือการใช้งานนี้
```
