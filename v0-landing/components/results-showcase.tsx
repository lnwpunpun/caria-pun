"use client"

import { motion } from "motion/react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"
import { TrendingUp, ArrowUpRight } from "lucide-react"

const CAREERS = [
  { rank: 1, role: "Data Scientist", match: 92, gap: "Low", tone: "orange" },
  { rank: 2, role: "ML Engineer", match: 87, gap: "Medium", tone: "blue" },
  { rank: 3, role: "Product Analyst", match: 81, gap: "Medium", tone: "blue" },
] as const

const RADAR_DATA = [
  { axis: "Technical", you: 78, role: 90 },
  { axis: "Analytical", you: 88, role: 85 },
  { axis: "Communication", you: 64, role: 80 },
  { axis: "Leadership", you: 55, role: 70 },
  { axis: "Domain", you: 72, role: 88 },
  { axis: "Adaptability", you: 84, role: 75 },
]

export function ResultsShowcase() {
  return (
    <section id="results" className="relative overflow-hidden bg-brand-blue py-28 text-white sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 size-[60vmin] translate-x-1/3 rounded-full bg-[radial-gradient(circle,_rgba(243,146,0,0.25)_0%,_transparent_65%)] blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">
            Your results
          </p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            See exactly where you stand
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
            Your top matches, ranked. Then drill into a 3-axis radar comparing your
            competencies against what each role really demands.
          </p>
        </div>

        {/* Career cards */}
        <div className="mb-20 grid gap-5 md:grid-cols-3">
          {CAREERS.map((c, i) => (
            <motion.article
              key={c.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className={`group relative animate-float-slow rounded-[1.75rem] border border-white/10 p-7 ${
                c.tone === "orange" ? "bg-brand-orange text-brand-orange-foreground" : "glass-dark"
              }`}
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span
                  className={`flex size-10 items-center justify-center rounded-full text-sm font-semibold ${
                    c.tone === "orange" ? "bg-black/15 text-brand-orange-foreground" : "bg-white/10 text-white"
                  }`}
                >
                  #{c.rank}
                </span>
                <ArrowUpRight
                  className={`size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    c.tone === "orange" ? "text-brand-orange-foreground/70" : "text-white/50"
                  }`}
                />
              </div>
              <h3 className="text-xl font-semibold">{c.role}</h3>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className={`text-4xl font-semibold ${c.tone === "orange" ? "" : "text-brand-orange"}`}>
                    {c.match}%
                  </p>
                  <p className={`text-xs ${c.tone === "orange" ? "text-brand-orange-foreground/70" : "text-white/50"}`}>
                    match score
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    c.tone === "orange" ? "bg-black/15" : "bg-white/10"
                  }`}
                >
                  {c.gap} gap
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Radar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-dark relative mx-auto grid max-w-4xl gap-8 rounded-[2rem] border border-white/10 p-6 sm:p-10 md:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(243,146,0,0.25)_0%,_transparent_60%)] blur-2xl"
            />
            <div className="relative h-[300px] w-full sm:h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR_DATA} outerRadius="72%">
                  <PolarGrid stroke="rgba(255,255,255,0.15)" />
                  <PolarAngleAxis
                    dataKey="axis"
                    tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
                  />
                  <Radar
                    name="Role requirement"
                    dataKey="role"
                    stroke="rgba(255,255,255,0.5)"
                    fill="rgba(255,255,255,0.08)"
                    strokeWidth={2}
                  />
                  <Radar
                    name="You"
                    dataKey="you"
                    stroke="#f39200"
                    fill="#f39200"
                    fillOpacity={0.35}
                    strokeWidth={2.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
              <TrendingUp className="size-3.5 text-brand-orange" />
              3-axis drill-down
            </span>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">
              You vs. role requirement
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              The orange field is you. The outline is what a Data Scientist role demands.
              Wherever the outline pulls ahead, that&apos;s your gap to close.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="size-3 rounded-full bg-brand-orange" />
                <span className="text-white/80">Your competencies</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="size-3 rounded-full border-2 border-white/50" />
                <span className="text-white/80">Role requirement</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
