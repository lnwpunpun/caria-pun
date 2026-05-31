"use client"

import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { Sparkles, ArrowUp } from "lucide-react"

const SKILLS = [
  { key: "communication", label: "Communication", base: 64 },
  { key: "leadership", label: "Leadership", base: 55 },
  { key: "domain", label: "Domain knowledge", base: 72 },
]

const ROLES = [
  { role: "Data Scientist", weights: { communication: 0.3, leadership: 0.2, domain: 0.5 }, base: 78 },
  { role: "ML Engineer", weights: { communication: 0.2, leadership: 0.2, domain: 0.6 }, base: 74 },
  { role: "Product Analyst", weights: { communication: 0.5, leadership: 0.3, domain: 0.2 }, base: 71 },
]

export function WhatIfSimulator() {
  const [skills, setSkills] = useState<Record<string, number>>({
    communication: 64,
    leadership: 55,
    domain: 72,
  })

  const ranked = useMemo(() => {
    return ROLES.map((r) => {
      const lift =
        (skills.communication - 64) * r.weights.communication +
        (skills.leadership - 55) * r.weights.leadership +
        (skills.domain - 72) * r.weights.domain
      const score = Math.max(0, Math.min(100, Math.round(r.base + lift * 0.4)))
      return { role: r.role, score, lift: Math.round(lift * 0.4) }
    }).sort((a, b) => b.score - a.score)
  }, [skills])

  return (
    <section id="simulator" className="relative overflow-hidden bg-background py-28 sm:py-36">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            <Sparkles className="size-3.5 text-brand-orange" />
            What-if simulator
          </span>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Move a skill. Watch your future shift.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Drag any competency and your role rankings re-rank instantly — so you can
            see precisely which investments pay off.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Sliders */}
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_20px_60px_-30px_rgba(0,16,40,0.2)] sm:p-8">
            <p className="mb-6 text-sm font-semibold">Adjust your competencies</p>
            <div className="flex flex-col gap-8">
              {SKILLS.map((s) => (
                <div key={s.key}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium">{s.label}</span>
                    <span className="flex items-center gap-2">
                      {skills[s.key] > s.base && (
                        <span className="flex items-center gap-0.5 text-xs font-semibold text-brand-orange">
                          <ArrowUp className="size-3" />
                          {skills[s.key] - s.base}
                        </span>
                      )}
                      <span className="rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-xs font-semibold text-brand-orange">
                        {skills[s.key]}
                      </span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={skills[s.key]}
                    aria-label={s.label}
                    onChange={(e) =>
                      setSkills((prev) => ({ ...prev, [s.key]: Number(e.target.value) }))
                    }
                    className="caria-slider w-full"
                    style={{ "--val": `${skills[s.key]}%` } as React.CSSProperties}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSkills({ communication: 64, leadership: 55, domain: 72 })}
              className="mt-8 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Reset to current
            </button>
          </div>

          {/* Rankings */}
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_20px_60px_-30px_rgba(0,16,40,0.2)] sm:p-8">
            <p className="mb-6 text-sm font-semibold">Live role ranking</p>
            <div className="flex flex-col gap-3">
              {ranked.map((r, i) => (
                <motion.div
                  key={r.role}
                  layout
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className={`flex items-center gap-4 rounded-2xl border p-4 ${
                    i === 0 ? "border-brand-orange/40 bg-brand-orange/5" : "border-border bg-muted/50"
                  }`}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      i === 0 ? "bg-brand-orange text-brand-orange-foreground" : "bg-brand-blue text-white"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-sm font-medium">{r.role}</span>
                      <span className="text-sm font-semibold tabular-nums">{r.score}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <motion.div
                        layout
                        animate={{ width: `${r.score}%` }}
                        transition={{ type: "spring", stiffness: 200, damping: 30 }}
                        className={`h-full rounded-full ${i === 0 ? "bg-brand-orange" : "bg-brand-blue"}`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
