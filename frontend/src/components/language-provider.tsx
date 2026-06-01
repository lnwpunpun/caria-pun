"use client"

import { createContext, useContext, useEffect, useState } from "react"

export type Lang = "en" | "th"

// One translation table. Add keys here; sections read them via `useLanguage().t`.
const en = {
  nav: {
    howItWorks: "How it works",
    assessment: "Assessment",
    results: "Results",
    simulator: "Simulator",
    start: "Start Assessment",
  },
  hero: {
    badge: "AI-Powered Career Intelligence",
    line1: "Discover Your",
    accent: "Digital Career",
    line3: "Path.",
    sub: "CARIA-GAP maps your competencies across 66 digital skills, identifies your career gaps, and delivers a precision-engineered roadmap to your ideal role.",
    ctaPrimary: "Discover Your Career",
    ctaSecondary: "See How It Works",
    stats: [
      { label: "Competencies Mapped" },
      { label: "Match Accuracy" },
      { label: "Career Pathways" },
    ],
  },
  howItWorks: {
    eyebrow: "The Process",
    title: "How CARIA-GAP Works",
    subtitle: "Three precision-engineered steps from raw input to career clarity.",
  },
  assessment: {
    eyebrow: "Frictionless input",
    title: "An assessment that feels effortless",
    subtitle: "Slide to answer. No long forms, no jargon — just a clean interface that captures your attitudes with precision.",
    module: "Attitude module",
    section: "Section 2 of 6",
    questionsCount: "3 questions",
    disagree: "Disagree",
    agree: "Agree",
    saveAndContinue: "Save & continue",
    stronglyDisagreeLabel: "Strongly disagree",
    disagreeLabel: "Disagree",
    neutralLabel: "Neutral",
    agreeLabel: "Agree",
    stronglyAgreeLabel: "Strongly agree",
    questions: [
      "I enjoy breaking down complex problems into structured steps.",
      "I adapt quickly when tools, processes, or priorities change.",
      "I actively seek feedback to improve my work.",
    ],
  },
  results: {
    eyebrow: "Career Intelligence",
    title: "Your Top Career Matches",
    subtitle: "Precision-ranked pathways based on your competency profile and real-time market demand signals.",
    matchScore: "Match Score",
    skillGaps: "skill gaps",
    roadmapTitle: "Career",
    roadmapTitleAccent: "Roadmap",
    roadmapSubtitle: "Upskill timeline to prepare you for your target career path.",
  },
  simulator: {
    eyebrow: "What-If Simulator",
    title: "Explore Your Upskilling Path",
    subtitle: "Adjust your skill levels and watch career match scores update in real-time. Find your optimal learning investment.",
    skillCalibration: "Skill Calibration",
    dragSliders: "Drag sliders to simulate upskilling",
    novice: "Novice",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert",
    resetBaseline: "Reset to Baseline",
    liveRankings: "Live Rankings",
    liveRankingsSub: "Updates as you calibrate skills",
    tipTitle: "Tip:",
    tipBody1: "Increasing your ",
    tipBody2: " score by 20 points would boost your ",
    tipBody3: " match by approximately ",
    generateRoadmap: "Generate My Learning Roadmap →",
  },
}

const th: typeof en = {
  nav: {
    howItWorks: "วิธีการทำงาน",
    assessment: "แบบประเมิน",
    results: "ผลลัพธ์",
    simulator: "ตัวจำลอง",
    start: "เริ่มประเมิน",
  },
  hero: {
    badge: "ระบบ AI วิเคราะห์เส้นทางอาชีพ",
    line1: "ค้นหาเส้นทาง",
    accent: "อาชีพดิจิทัล",
    line3: "ที่ใช่สำหรับคุณ",
    sub: "CARIA-GAP วิเคราะห์ทักษะของคุณกับ 66 ทักษะดิจิทัล เพื่อค้นหาช่องว่างและสร้างแผนพัฒนาสู่สายงานในฝัน",
    ctaPrimary: "ค้นหาอาชีพของคุณ",
    ctaSecondary: "ดูวิธีการทำงาน",
    stats: [
      { label: "ทักษะที่ระบบรองรับ" },
      { label: "ความแม่นยำ" },
      { label: "เส้นทางอาชีพ" },
    ],
  },
  howItWorks: {
    eyebrow: "ขั้นตอน",
    title: "CARIA-GAP ทำงานอย่างไร",
    subtitle: "สามขั้นตอนที่ออกแบบอย่างแม่นยำ จากข้อมูลดิบสู่ความชัดเจนในเส้นทางอาชีพ",
  },
  assessment: {
    eyebrow: "กรอกข้อมูลง่ายๆ",
    title: "แบบประเมินที่ทำได้อย่างไร้แรงต้าน",
    subtitle: "แค่เลื่อนเพื่อตอบ ไม่มีฟอร์มยาว ไม่มีศัพท์เทคนิค — เพียงอินเทอร์เฟซที่สะอาดตาและจับทัศนคติของคุณได้อย่างแม่นยำ",
    module: "โมดูลวัดทัศนคติ",
    section: "ส่วนที่ 2 จาก 6",
    questionsCount: "3 คำถาม",
    disagree: "ไม่เห็นด้วย",
    agree: "เห็นด้วย",
    saveAndContinue: "บันทึกและทำต่อ",
    stronglyDisagreeLabel: "ไม่เห็นด้วยอย่างยิ่ง",
    disagreeLabel: "ไม่เห็นด้วย",
    neutralLabel: "เฉยๆ",
    agreeLabel: "เห็นด้วย",
    stronglyAgreeLabel: "เห็นด้วยอย่างยิ่ง",
    questions: [
      "ฉันชอบแยกย่อยปัญหาที่ซับซ้อนออกเป็นขั้นตอนที่มีโครงสร้างชัดเจน",
      "ฉันปรับตัวได้เร็วเมื่อเครื่องมือ กระบวนการ หรือลำดับความสำคัญเปลี่ยนไป",
      "ฉันแสวงหาคำแนะนำอย่างจริงจังเพื่อปรับปรุงงานของฉัน",
    ],
  },
  results: {
    eyebrow: "ปัญญาด้านอาชีพ",
    title: "อาชีพที่ตรงกับคุณมากที่สุด",
    subtitle: "เส้นทางที่จัดอันดับอย่างแม่นยำจากโปรไฟล์สมรรถนะของคุณและสัญญาณความต้องการของตลาดแบบเรียลไทม์",
    matchScore: "คะแนนการจับคู่",
    skillGaps: "ทักษะที่ต้องพัฒนา",
    roadmapTitle: "แผนผัง",
    roadmapTitleAccent: "เส้นทางอาชีพ",
    roadmapSubtitle: "แผนผังเส้นทางการพัฒนาทักษะ (Upskill Timeline) เพื่อเตรียมพร้อมสู่อาชีพเป้าหมาย",
  },
  simulator: {
    eyebrow: "ตัวจำลองสถานการณ์",
    title: "จำลองการปรับระดับทักษะ",
    subtitle: "เลื่อนแถบเพื่อจำลองการพัฒนาทักษะแล้วดูคะแนนจับคู่อาชีพอัปเดตแบบเรียลไทม์ ค้นหาการลงทุนด้านการเรียนรู้ที่คุ้มค่าที่สุด",
    skillCalibration: "จำลองการปรับระดับทักษะ",
    dragSliders: "เลื่อนแถบเพื่อจำลองการพัฒนาทักษะ",
    novice: "ระดับเริ่มต้น",
    intermediate: "ระดับกลาง",
    advanced: "ระดับสูง",
    expert: "ระดับเชี่ยวชาญ",
    resetBaseline: "รีเซ็ตค่าเริ่มต้น",
    liveRankings: "อันดับอาชีพแบบเรียลไทม์",
    liveRankingsSub: "อัปเดตทันทีเมื่อปรับระดับทักษะ",
    tipTitle: "เคล็ดลับ:",
    tipBody1: "การเพิ่มทักษะ ",
    tipBody2: " อีก 20 คะแนน จะช่วยเพิ่มโอกาสแมตช์กับ ",
    tipBody3: " ถึง ",
    generateRoadmap: "สร้างแผนการเรียนรู้ของคุณ",
  },
}

type Dict = typeof en

const LanguageContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  t: Dict
}>({ lang: "en", setLang: () => {}, t: en })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")

  // Restore saved choice after mount (avoids SSR/hydration mismatch).
  useEffect(() => {
    const saved = localStorage.getItem("lang")
    if (saved === "th" || saved === "en") setLangState(saved)
  }, [])

  // Reflect on <html> so global CSS (Thai font) can react if needed.
  useEffect(() => {
    document.documentElement.dataset.lang = lang
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem("lang", l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: lang === "th" ? th : en }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
