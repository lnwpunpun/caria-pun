/**
 * CARIA-GAP Hero Section — Precision Instrument UI
 * Design: Full-bleed dark canvas, animated neural orb, bold Syne typography
 * Colors: #050A14 bg | #F39200 accent | #1E90FF secondary
 */
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const InteractiveCareerSphere = dynamic(
  () => import("@/components/InteractiveCareerSphere"),
  {
    ssr: false,
    loading: () => (
      <div className="w-[380px] h-[380px] lg:w-[440px] lg:h-[440px] rounded-full bg-white/[0.01] border border-white/5 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#F39200]/30 border-t-[#F39200] animate-spin" />
      </div>
    ),
  }
);

const HERO_ORB_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663715925716/C5srhVpvKrV4qWgj4NxM6w/hero-orb-CqVHLGvLZ2Mq825NTHYLoH.webp";

const stats = [
  { value: "66", label: "Competencies Mapped", unit: "" },
  { value: "95", label: "Match Accuracy", unit: "%" },
  { value: "3", label: "Career Pathways", unit: "×" },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse 95% 85% at 72% 45%, #0A1422 0%, #050A14 45%, #030712 100%)" }}
    >
      {/* Cool glow behind the 3D nexus (right) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 60% at 74% 48%, rgba(45,156,255,0.10) 0%, transparent 65%)",
        }}
      />
      {/* Warm glow behind the headline (left) to lift text off the canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 45% 55% at 18% 42%, rgba(243,146,0,0.07) 0%, transparent 68%)",
        }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(30,144,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,144,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            style={{ y: textY, opacity }}
            className="relative flex flex-col gap-6 z-10 max-w-xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-[#F39200]/30 bg-[#F39200]/5"
            >
              <div className="w-2 h-2 rounded-full bg-[#F39200] animate-pulse" />
              <span className="text-xs font-dm text-[#F39200] tracking-widest uppercase">
                AI-Powered Career Intelligence
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="font-syne font-extrabold text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight"
            >
              <span className="text-white">Discover Your</span>
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #F39200 0%, #FFB84D 50%, #F39200 100%)" }}
              >
                Digital Career
              </span>
              <br />
              <span className="text-white/80">Path.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-white/55 font-dm text-lg leading-relaxed max-w-lg"
            >
              CARIA-GAP maps your competencies across 66 digital skills, identifies your career gaps, and delivers a precision-engineered roadmap to your ideal role.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <motion.a
                href="#assessment"
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#F39200] text-[#050A14] font-syne font-bold text-base tracking-wide"
                style={{ boxShadow: "0 0 30px rgba(243,146,0,0.4), 0 4px 20px rgba(0,0,0,0.3)" }}
                whileHover={{ scale: 1.04, boxShadow: "0 0 45px rgba(243,146,0,0.6), 0 4px 24px rgba(0,0,0,0.4)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <span>Discover Your Career</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>

              <motion.a
                href="#how-it-works"
                className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-dm text-base transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                See How It Works
              </motion.a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex gap-8 pt-4 border-t border-white/8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex flex-col gap-1"
                >
                  <div className="font-syne font-extrabold text-2xl text-white">
                    {stat.value}
                    <span className="text-[#F39200]">{stat.unit}</span>
                  </div>
                  <div className="text-xs font-dm text-white/40 tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Neural Orb */}
          <motion.div
            style={{ y: orbY, scale: orbScale }}
            className="relative flex items-center justify-center h-[500px] lg:h-[800px] w-full"
          >
            {/* Neural Orb wrapper pushed to the right, low-opacity on mobile */}
            <div className="absolute top-1/2 right-[-60%] lg:right-[-45%] xl:right-[-55%] -translate-y-1/2 w-[1000px] h-[1000px] z-0 pointer-events-auto flex items-center justify-center opacity-40 lg:opacity-100">
              {/* Outer glow ring */}
              <motion.div
                className="absolute w-[720px] h-[720px] rounded-full hidden lg:block"
                style={{
                  background: "radial-gradient(circle, rgba(243,146,0,0.06) 0%, transparent 70%)",
                  border: "1px solid rgba(243,146,0,0.1)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-[580px] h-[580px] rounded-full hidden lg:block"
                style={{
                  border: "1px solid rgba(30,144,255,0.15)",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              {/* Interactive 3D Career Sphere */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <InteractiveCareerSphere />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-dm text-white/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
