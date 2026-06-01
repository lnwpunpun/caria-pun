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
    subtitle:
      "Slide to answer. No long forms, no jargon — just a clean interface that captures your attitudes with precision.",
  },
  results: {
    eyebrow: "Career Intelligence",
    title: "Your Top Career Matches",
    subtitle:
      "Precision-ranked pathways based on your competency profile and real-time market demand signals.",
  },
  simulator: {
    eyebrow: "What-If Simulator",
    title: "Explore Your Upskilling Path",
    subtitle:
      "Adjust your skill levels and watch career match scores update in real-time. Find your optimal learning investment.",
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
    badge: "ระบบวิเคราะห์อาชีพด้วย AI",
    line1: "ค้นพบเส้นทาง",
    accent: "อาชีพดิจิทัล",
    line3: "ของคุณ",
    sub: "CARIA-GAP ทำแผนที่สมรรถนะของคุณครอบคลุม 66 ทักษะดิจิทัล ระบุช่องว่างของอาชีพ และมอบโรดแมปที่ออกแบบอย่างแม่นยำสู่บทบาทในฝันของคุณ",
    ctaPrimary: "ค้นหาอาชีพของคุณ",
    ctaSecondary: "ดูวิธีการทำงาน",
    stats: [
      { label: "สมรรถนะที่ทำแผนที่" },
      { label: "ความแม่นยำในการจับคู่" },
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
    subtitle:
      "แค่เลื่อนเพื่อตอบ ไม่มีฟอร์มยาว ไม่มีศัพท์เทคนิค — เพียงอินเทอร์เฟซที่สะอาดตาและจับทัศนคติของคุณได้อย่างแม่นยำ",
  },
  results: {
    eyebrow: "ปัญญาด้านอาชีพ",
    title: "อาชีพที่ตรงกับคุณมากที่สุด",
    subtitle:
      "เส้นทางที่จัดอันดับอย่างแม่นยำจากโปรไฟล์สมรรถนะของคุณและสัญญาณความต้องการของตลาดแบบเรียลไทม์",
  },
  simulator: {
    eyebrow: "ตัวจำลองสถานการณ์",
    title: "สำรวจเส้นทางพัฒนาทักษะของคุณ",
    subtitle:
      "ปรับระดับทักษะแล้วดูคะแนนจับคู่อาชีพอัปเดตแบบเรียลไทม์ ค้นหาการลงทุนด้านการเรียนรู้ที่คุ้มค่าที่สุด",
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
