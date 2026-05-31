/**
 * CARIA-GAP How It Works — Precision Instrument UI
 * Design: Compact horizontal 3-step grid (not 3 full viewport heights)
 * Framer Motion: scroll-triggered 3D reveal per card
 */
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    step: "01",
    title: "Input",
    subtitle: "Upload & Assess",
    description: "Upload your resume or complete a hybrid competency assessment covering 66 digital skills across attitude, knowledge, and application dimensions.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3v14M8 11l6 6 6-6" stroke="#F39200" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="4" y="20" width="20" height="4" rx="2" stroke="#1E90FF" strokeWidth="1.5"/>
      </svg>
    ),
    color: "#F39200",
    detail: "Resume + Hybrid Assessment",
  },
  {
    step: "02",
    title: "Process",
    subtitle: "AI Matching Engine",
    description: "Our algorithm cross-references your competency profile against 66 standardized digital career requirements, computing weighted gap scores in real-time.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#1E90FF" strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="5" stroke="#F39200" strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="1.5" fill="#F39200"/>
        <path d="M14 4v2M14 22v2M4 14h2M22 14h2" stroke="#1E90FF" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    color: "#1E90FF",
    detail: "66 Competency Dimensions",
  },
  {
    step: "03",
    title: "Output",
    subtitle: "Career Gap Analysis",
    description: "Receive your personalized Top 3 career recommendations with a 3-axis radar chart showing exact skill gaps and a what-if simulator to explore upskilling paths.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polygon points="14,4 24,20 4,20" stroke="#F39200" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        <path d="M14 10v5M14 18v1" stroke="#F39200" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M7 24h14" stroke="#1E90FF" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    color: "#F39200",
    detail: "Radar Chart + Simulator",
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 12 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.23, 1, 0.32, 1],
      }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="relative group"
    >
      <motion.div
        className="relative h-full glass-panel rounded-2xl p-7 overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
          background: "linear-gradient(135deg, rgba(13,26,48,0.9) 0%, rgba(5,10,20,0.95) 100%)",
        }}
        whileHover={{
          scale: 1.02,
          borderColor: `${step.color}40`,
          boxShadow: `0 0 30px ${step.color}20, 0 20px 60px rgba(0,0,0,0.4)`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Step number watermark */}
        <div
          className="absolute -top-4 -right-2 font-syne font-extrabold text-8xl opacity-[0.04] select-none pointer-events-none"
          style={{ color: step.color }}
        >
          {step.step}
        </div>

        {/* Connector line (not last) */}
        {index < steps.length - 1 && (
          <div className="hidden lg:block absolute top-1/2 -right-px w-px h-12 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        )}

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
          style={{
            background: `linear-gradient(135deg, ${step.color}15, ${step.color}05)`,
            border: `1px solid ${step.color}25`,
          }}
        >
          {step.icon}
        </div>

        {/* Step badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-dm font-semibold tracking-widest uppercase"
            style={{ color: step.color }}
          >
            Step {step.step}
          </span>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${step.color}30, transparent)` }} />
        </div>

        <h3 className="font-syne font-bold text-xl text-white mb-1">{step.title}</h3>
        <p className="text-sm font-dm text-white/50 mb-3">{step.subtitle}</p>
        <p className="text-sm font-dm text-white/60 leading-relaxed">{step.description}</p>

        {/* Detail pill */}
        <div
          className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-dm"
          style={{
            background: `${step.color}10`,
            border: `1px solid ${step.color}20`,
            color: step.color,
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: step.color }} />
          {step.detail}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="how-it-works" className="py-24 relative" style={{ background: "#050A14" }}>
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(30,144,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1E90FF]/20 bg-[#1E90FF]/5 mb-5">
            <div className="w-2 h-2 rounded-full bg-[#1E90FF]" />
            <span className="text-xs font-dm text-[#1E90FF] tracking-widest uppercase">The Process</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl lg:text-5xl text-white mb-4">
            How CARIA-GAP Works
          </h2>
          <p className="text-white/50 font-dm text-lg max-w-xl mx-auto">
            Three precision-engineered steps from raw input to career clarity.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {/* Horizontal connector */}
          <div
            className="hidden lg:block absolute top-1/2 left-[33%] right-[33%] h-px -translate-y-1/2 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(243,146,0,0.2), transparent)" }}
          />
          {steps.map((step, i) => (
            <StepCard key={step.step} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
