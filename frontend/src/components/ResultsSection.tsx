/**
 * CARIA-GAP Results Section — Precision Instrument UI
 * Design: Top 3 Career Cards with glass morphism, no solid orange backgrounds
 * Framer Motion: staggered 3D reveal, physics hover, glow border on hover
 */
"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CARD_BG_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663715925716/C5srhVpvKrV4qWgj4NxM6w/career-card-bg-5L8EkNTMfS6jDs3zeQRXYj.webp";

const careers = [
  {
    rank: 1,
    title: "Data Scientist",
    match: 87,
    department: "Analytics & AI",
    skills: ["Python", "Machine Learning", "Statistics", "Data Viz"],
    gaps: 3,
    salary: "฿85K–120K",
    trend: "+24% demand",
    trendUp: true,
    color: "#F39200",
    description: "Design and implement ML models to extract insights from complex datasets. Lead data-driven decision making across the organization.",
  },
  {
    rank: 2,
    title: "Cloud Architect",
    match: 74,
    department: "Infrastructure",
    skills: ["AWS", "Kubernetes", "DevOps", "Security"],
    gaps: 7,
    salary: "฿90K–140K",
    trend: "+31% demand",
    trendUp: true,
    color: "#1E90FF",
    description: "Design scalable, resilient cloud infrastructure solutions. Architect multi-cloud strategies and drive digital transformation initiatives.",
  },
  {
    rank: 3,
    title: "Cybersecurity Analyst",
    match: 68,
    department: "Security Operations",
    skills: ["SIEM", "Penetration Testing", "Risk Analysis", "Compliance"],
    gaps: 11,
    salary: "฿75K–110K",
    trend: "+18% demand",
    trendUp: true,
    color: "#A78BFA",
    description: "Monitor, detect, and respond to security threats. Implement defense strategies and ensure compliance with security frameworks.",
  },
];

function CareerCard({ career, index }: { career: typeof careers[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cardRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

  const isTop = career.rank === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 120, rotateX: 30, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 40, damping: 15, duration: 1.2, delay: index * 0.15 }}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      className={`relative ${isTop ? "lg:-mt-4 lg:mb-4" : ""}`}
    >
      <motion.div
        className={`relative rounded-3xl overflow-hidden h-full border bg-white shadow-[0_10px_40px_rgb(0,0,0,0.06)] dark:bg-[#0d1726] ${
          isTop
            ? "border-[#F39200]/30 dark:shadow-[0_0_40px_rgba(243,146,0,0.12),0_20px_60px_rgba(0,0,0,0.45)]"
            : "border-slate-200 dark:border-white/10 dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
        }`}
        style={{
          rotateX: cardRotateX,
          scale: cardScale,
        }}
        whileHover={{
          scale: 1.04,
          borderColor: `${career.color}50`,
          boxShadow: `0 0 50px ${career.color}25, 0 30px 80px rgba(0,0,0,0.6)`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Card BG texture */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url(${CARD_BG_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${career.color}60, transparent)` }}
        />

        <div className="relative p-7">
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              {/* Rank badge */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-syne font-extrabold text-sm"
                style={{
                  background: `${career.color}15`,
                  border: `1.5px solid ${career.color}40`,
                  color: career.color,
                  boxShadow: `0 0 12px ${career.color}25`,
                }}
              >
                #{career.rank}
              </div>
              <div>
                <p className="text-xs font-dm text-muted-foreground tracking-wide">{career.department}</p>
                <h3 className="font-syne font-bold text-foreground text-xl leading-tight">{career.title}</h3>
              </div>
            </div>

            {/* Match score */}
            <div className="flex flex-col items-end">
              <div
                className="font-syne font-extrabold text-3xl"
                style={{ color: career.color }}
              >
                {career.match}%
              </div>
              <div className="text-xs font-dm text-muted-foreground">Match Score</div>
            </div>
          </div>

          {/* Match bar */}
          <div className="mb-5">
            <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${career.color}80, ${career.color})` }}
                initial={{ width: "0%" }}
                animate={inView ? { width: `${career.match}%` } : {}}
                transition={{ duration: 1.2, delay: 0.5 + index * 0.15, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-sm font-dm text-muted-foreground leading-relaxed mb-5">{career.description}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {career.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-xs font-dm"
                style={{
                  background: `${career.color}08`,
                  border: `1px solid ${career.color}20`,
                  color: `${career.color}CC`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Footer stats */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke={career.color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
              </svg>
              <span className="text-xs font-dm text-muted-foreground">{career.gaps} skill gaps</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-dm text-muted-foreground">{career.salary}</span>
              <span
                className="text-xs font-dm flex items-center gap-1"
                style={{ color: "#4ADE80" }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {career.trend}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top 1 crown indicator */}
      {isTop && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-syne font-bold tracking-wider text-[#050A14]"
          style={{
            background: "linear-gradient(135deg, #F39200, #FFB84D)",
            boxShadow: "0 0 20px rgba(243,146,0,0.5)",
          }}
        >
          ★ TOP MATCH
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ResultsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="results" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#0a0f1c]">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(243,146,0,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F39200]/20 bg-[#F39200]/5 mb-5">
            <div className="w-2 h-2 rounded-full bg-[#F39200]" />
            <span className="text-xs font-dm text-[#F39200] tracking-widest uppercase">
              Career Intelligence
            </span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl lg:text-5xl text-foreground mb-4">
            Your Top Career Matches
          </h2>
          <p className="text-muted-foreground font-dm text-lg max-w-xl mx-auto">
            Precision-ranked pathways based on your competency profile and real-time market demand signals.
          </p>
        </motion.div>

        {/* Career Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {careers.map((career, i) => (
            <CareerCard key={career.rank} career={career} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
