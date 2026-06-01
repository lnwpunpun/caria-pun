"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { Brain } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const HIGHLIGHTS = [
  { emoji: "⏱️", th: "ใช้เวลาเพียง 10-15 นาที", en: "Only 10–15 minutes" },
  { emoji: "🎯", th: "ความแม่นยำสูง (Precision@10)", en: "High precision (Precision@10)" },
  { emoji: "🧠", th: "วิเคราะห์ด้วย AI", en: "AI-powered analysis" },
]

export function AssessmentMockup() {
  const { lang } = useLanguage()
  const thai = lang === "th"

  return (
    <section id="assessment" className="relative overflow-hidden bg-background py-28 sm:py-36">
      {/* Ambient accents */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/3 size-72 rounded-full bg-brand-orange/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-1/4 size-72 rounded-full bg-[#2563EB]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0A1422]/60 md:p-12"
        >
          {/* Decorative glow behind the icon */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-48 w-48 rounded-full bg-brand-orange/20 blur-3xl" />

          {/* Floating animated icon */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative flex justify-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#F39200] to-[#E0700A] shadow-[0_0_30px_rgba(243,146,0,0.4)]">
              <Brain size={40} className="text-white" />
            </div>
          </motion.div>

          {/* Pre-title badge */}
          <p className="mt-5 text-center text-xs font-bold uppercase tracking-widest text-brand-orange">
            In-Depth Evaluation
          </p>

          {/* Headline */}
          <h2 className={`mb-2 mt-2 text-center text-3xl font-bold text-slate-900 dark:text-white md:text-4xl ${thai ? "font-thai leading-snug" : "font-syne"}`}>
            {thai ? "แบบทดสอบประเมินตนเอง 81 ข้อ" : "81-Question Self Assessment"}
          </h2>

          {/* Subtitle */}
          <p className={`mx-auto mb-8 max-w-2xl text-center leading-relaxed text-slate-600 dark:text-slate-300 ${thai ? "font-thai leading-loose" : ""}`}>
            {thai
              ? "วิเคราะห์และจับคู่สมรรถนะ 66 มิติกับ 78 อาชีพดิจิทัล เพื่อเป้าหมายการวางแผนการเรียนรู้ที่แม่นยำที่สุด"
              : "Maps your 66 competency dimensions against 78 digital careers for the most precise learning roadmap."}
          </p>

          {/* Value highlights */}
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.en}
                className={`rounded-xl border border-slate-200 bg-slate-100 p-3 text-center text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 ${thai ? "font-thai" : ""}`}
              >
                {h.emoji} {thai ? h.th : h.en}
              </div>
            ))}
          </div>

          {/* Grand CTA */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/assessment"
              className={`block w-full rounded-full bg-[#F39200] px-10 py-4 text-center text-lg font-bold text-[#050A14] shadow-[0_0_20px_rgba(243,146,0,0.4)] transition-transform hover:scale-105 sm:w-auto ${thai ? "font-thai" : ""}`}
            >
              {thai ? "เริ่มทำแบบทดสอบ (Start Assessment) →" : "Start Assessment →"}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
