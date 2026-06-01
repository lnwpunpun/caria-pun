"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Check } from "lucide-react"
import { useLanguage } from "@/components/language-provider"


function labelFor(v: number, t: any) {
  if (v < 20) return t.assessment.stronglyDisagreeLabel
  if (v < 40) return t.assessment.disagreeLabel
  if (v < 60) return t.assessment.neutralLabel
  if (v < 80) return t.assessment.agreeLabel
  return t.assessment.stronglyAgreeLabel
}

export function AssessmentMockup() {
  const { t, lang } = useLanguage()
  const [values, setValues] = useState<number[]>([72, 48, 88])
  const thai = lang === "th"

  return (
    <section id="assessment" className="relative overflow-hidden bg-background py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 size-72 rounded-full bg-accent blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className={`text-xs font-medium text-muted-foreground ${thai ? "font-thai" : "uppercase tracking-[0.3em]"}`}>
            {t.assessment.eyebrow}
          </p>
          <h2 className={`mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl ${thai ? "font-thai leading-snug" : ""}`}>
            {t.assessment.title}
          </h2>
          <p className={`mt-5 text-pretty text-lg text-muted-foreground sm:text-xl ${thai ? "font-thai leading-loose" : "leading-relaxed"}`}>
            {t.assessment.subtitle}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_-30px_rgba(0,16,40,0.25)] sm:p-10"
        >
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-blue text-xs font-semibold text-white">
                A
              </span>
              <div className={thai ? "font-thai" : ""}>
                <p className="text-sm font-semibold">{t.assessment.module}</p>
                <p className="text-xs text-muted-foreground">{t.assessment.section}</p>
              </div>
            </div>
            <span className={`rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground ${thai ? "font-thai" : ""}`}>
              {t.assessment.questionsCount}
            </span>
          </div>

          <div className="flex flex-col gap-9">
            {t.assessment.questions.map((q, i) => (
              <div key={q}>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <p className={`text-sm font-medium leading-relaxed sm:text-base ${thai ? "font-thai leading-loose" : ""}`}>{q}</p>
                  <span className="shrink-0 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange font-mono">
                    {values[i]}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={values[i]}
                  aria-label={q}
                  onChange={(e) =>
                    setValues((prev) => {
                      const next = [...prev]
                      next[i] = Number(e.target.value)
                      return next
                    })
                  }
                  className="caria-slider w-full"
                  style={{ "--val": `${values[i]}%` } as React.CSSProperties}
                />
                <div className={`mt-2 flex justify-between text-[11px] text-muted-foreground ${thai ? "font-thai" : ""}`}>
                  <span>{t.assessment.disagree}</span>
                  <span className="font-medium text-foreground">{labelFor(values[i], t)}</span>
                  <span>{t.assessment.agree}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange py-3.5 text-sm font-semibold text-brand-orange-foreground shadow-[0_14px_40px_-12px_rgba(243,146,0,0.6)] transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99] ${thai ? "font-thai" : ""}`}
          >
            <Check className="size-4" />
            {t.assessment.saveAndContinue}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
