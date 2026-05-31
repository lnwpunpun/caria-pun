"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { Upload, Cpu, Target } from "lucide-react"

const STEPS = [
  {
    n: "01",
    icon: Upload,
    title: "Input",
    desc: "Upload your resume or take the hybrid assessment. CARIA-GAP ingests your experience, skills, and aspirations in seconds.",
  },
  {
    n: "02",
    icon: Cpu,
    title: "Process",
    desc: "Our algorithm matches you across 66 digital competencies, weighting attitude, aptitude, and proven ability against live role requirements.",
  },
  {
    n: "03",
    icon: Target,
    title: "Output",
    desc: "Receive a precise career gap analysis — your strengths, your missing competencies, and the shortest path to your target role.",
  },
]

function Step({
  step,
  index,
  progress,
}: {
  step: (typeof STEPS)[number]
  index: number
  progress: MotionValue<number>
}) {
  const slot = 1 / STEPS.length
  const start = index * slot
  const end = start + slot
  const mid = start + slot / 2

  const opacity = useTransform(progress, [start, mid - 0.04, end - 0.04, end], [0, 1, 1, 0])
  const y = useTransform(progress, [start, mid], [120, 0])
  const rotateX = useTransform(progress, [start, mid, end], [35, 0, -25])
  const scale = useTransform(progress, [start, mid, end], [0.8, 1, 0.85])
  const z = useTransform(progress, [start, mid, end], [-200, 0, -120])

  const Icon = step.icon

  return (
    <motion.div
      style={{ opacity, y, rotateX, scale, z, transformStyle: "preserve-3d" }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="glass-dark mb-8 inline-flex size-20 items-center justify-center rounded-3xl border border-white/15">
          <Icon className="size-9 text-brand-orange" />
        </span>
        <span className="mb-4 text-sm font-mono font-medium tracking-[0.3em] text-brand-orange">
          STEP {step.n}
        </span>
        <h3 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          {step.title}
        </h3>
        <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
          {step.desc}
        </p>
      </div>
    </motion.div>
  )
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  return (
    <section id="how-it-works" ref={ref} className="relative h-[340vh] bg-black">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* header */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 pt-24 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            The CARIA-GAP method
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Three steps to clarity
          </h2>
        </div>

        {/* progress rail */}
        <ProgressRail progress={scrollYProgress} />

        {/* glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 size-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,47,108,0.45)_0%,_transparent_65%)] blur-3xl"
        />

        <div className="perspective-1000 relative flex-1">
          {STEPS.map((step, i) => (
            <Step key={step.n} step={step} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  const height = useTransform(progress, [0, 1], ["0%", "100%"])
  return (
    <div className="absolute right-6 top-1/2 z-20 hidden h-40 w-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/10 md:block">
      <motion.div style={{ height }} className="w-full rounded-full bg-brand-orange" />
    </div>
  )
}
