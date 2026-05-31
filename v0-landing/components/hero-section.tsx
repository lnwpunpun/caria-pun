"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const sphereY = useTransform(scrollYProgress, [0, 1], [0, 220])
  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const sphereRotate = useTransform(scrollYProgress, [0, 1], [0, 35])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* glow backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(243,146,0,0.22)_0%,_rgba(0,47,108,0.18)_38%,_transparent_68%)] blur-3xl animate-pulse-glow"
      />

      {/* 3D sphere */}
      <motion.div
        style={{ y: sphereY, scale: sphereScale, rotate: sphereRotate }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative size-[88vmin] max-w-[820px] animate-float-slow">
          <Image
            src="/hero-sphere.png"
            alt="Abstract 3D sphere of converging competency nodes"
            fill
            priority
            sizes="88vmin"
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* content */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-dark mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80"
        >
          <Sparkles className="size-3.5 text-brand-orange" />
          AI matching across 66 digital competencies
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl md:text-[5.5rem]"
        >
          Discover Your
          <br />
          <span className="text-brand-orange">Digital Career</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg"
        >
          CARIA-GAP maps your skills against real-world roles, pinpoints the gaps,
          and shows the exact path to close them — all in one intelligent assessment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#assessment"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 text-sm font-semibold text-brand-orange-foreground shadow-[0_16px_50px_-12px_rgba(243,146,0,0.7)] transition-transform duration-300 hover:scale-[1.04] active:scale-95"
          >
            Discover Your Digital Career
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#how-it-works"
            className="glass-dark inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            See how it works
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-14 grid grid-cols-3 gap-8 sm:gap-12"
        >
          {[
            { v: "66", l: "Competencies" },
            { v: "3-Axis", l: "Radar drill-down" },
            { v: "Live", l: "What-if simulator" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col items-center">
              <dt className="text-2xl font-semibold text-white sm:text-3xl">{s.v}</dt>
              <dd className="mt-1 text-xs text-white/50">{s.l}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY }}
            className="size-1 rounded-full bg-brand-orange"
          />
        </div>
      </motion.div>
    </section>
  )
}
