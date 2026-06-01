/**
 * CARIA-GAP What-If Simulator — Precision Instrument UI
 * Design: Precision sliders, real-time number-ticker, live ranking updates
 * Framer Motion: number-ticker animation, card reorder spring, scroll reveal
 */
"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MOCK_TOP10, MOCK_GAP_ANALYSIS } from "@/lib/mockData";
import { calculateMES, adjustScores } from "@/lib/mes-client";
import type { CareerVector } from "@/types";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/components/language-provider";

// Number ticker hook
function useNumberTicker(value: number, duration = 0.4) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    prevValue.current = value;

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - startTime) / (duration * 1000);
      if (elapsed < 1) {
        const eased = 1 - Math.pow(1 - elapsed, 3);
        setDisplayValue(Math.round(start + (end - start) * eased));
        requestAnimationFrame(tick);
      } else {
        setDisplayValue(end);
      }
    };
    requestAnimationFrame(tick);
  }, [value, duration]);

  return displayValue;
}


const initialSkills = MOCK_GAP_ANALYSIS.gaps.slice(0, 5).map((g, i) => {
  const colors = ["#F39200", "#1E90FF", "#A78BFA", "#4ADE80", "#F472B6"];
  return {
    id: g.competency_id,
    label: g.competency_id.replace(/^[ASK]\d{2}_/, '').replace(/_/g, ' '),
    value: g.student_score,
    originalValue: g.student_score,
    color: colors[i % colors.length]
  };
});

const careerTargets = MOCK_TOP10.top10_careers.slice(0, 3).map(c => {
  return {
    id: c.career_id,
    title: c.career_name,
    base: c.match_percentage,
    weights: {
      // Just assign some random weights to the top gaps for simulation
      [initialSkills[0]?.id]: 0.35,
      [initialSkills[1]?.id]: 0.20,
      [initialSkills[2]?.id]: 0.15,
      [initialSkills[3]?.id]: 0.20,
      [initialSkills[4]?.id]: 0.10,
    }
  };
});

function computeMatch(skills: typeof initialSkills, career: typeof careerTargets[0]) {
  let improvement = 0;
  skills.forEach(s => {
    const diff = Math.max(0, s.value - s.originalValue);
    const w = career.weights[s.id as keyof typeof career.weights] || 0;
    improvement += (diff / 100) * w * 100;
  });
  return Math.min(99, Math.round(career.base + improvement));
}

function MatchCard({
  career,
  match,
  rank,
  index,
}: {
  career: typeof careerTargets[0];
  match: number;
  rank: number;
  index: number;
}) {
  const displayMatch = useNumberTicker(match);
  const colors = ["#F39200", "#1E90FF", "#A78BFA"];
  const color = colors[rank - 1] || "#fff";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="relative rounded-2xl p-5 overflow-hidden border bg-slate-50 dark:bg-[#0a1322]"
      style={{
        borderColor: `${color}25`,
        boxShadow: rank === 1 ? `0 0 30px ${color}15` : undefined,
      }}
    >
      {/* Rank indicator */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center font-syne font-bold text-xs"
            style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
          >
            #{rank}
          </div>
          <span className="font-syne font-semibold text-foreground text-sm">{career.title}</span>
        </div>
        {/* Animated match % */}
        <motion.span
          className="font-syne font-extrabold text-2xl tabular-nums"
          style={{ color }}
          key={match}
        >
          {displayMatch}%
        </motion.span>
      </div>

      {/* Animated progress bar */}
      <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}60, ${color})` }}
          animate={{ width: `${match}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </motion.div>
  );
}

export default function SimulatorSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [skills, setSkills] = useState(initialSkills);
  const { t, lang } = useLanguage();
  const thai = lang === "th";

  const updateSkill = (id: string, value: number) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, value } : s)));
  };

  // Compute matches and sort by score
  const matches = careerTargets
    .map((c) => ({ career: c, match: computeMatch(skills, c) }))
    .sort((a, b) => b.match - a.match);

  const slidersContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const sliderItemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 25, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 12,
      },
    },
  };

  return (
    <section id="simulator" className="py-24 relative bg-background">
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 30% 50%, rgba(243,146,0,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F39200]/20 bg-[#F39200]/5 mb-5">
            <div className="w-2 h-2 rounded-full bg-[#F39200] animate-pulse" />
            <span className={`text-xs text-[#F39200] ${thai ? "font-thai" : "font-dm tracking-widest uppercase"}`}>
              {t.simulator.eyebrow}
            </span>
          </div>
          <h2 className={`font-extrabold text-4xl lg:text-5xl text-foreground mb-4 ${thai ? "font-thai leading-snug" : "font-syne"}`}>
            {t.simulator.title}
          </h2>
          <p className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto ${thai ? "font-thai leading-loose" : "font-dm leading-relaxed"}`}>
            {t.simulator.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Skill Sliders with 3D scroll reveal wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 25 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", bounce: 0.3, duration: 1 }}
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            className="w-full"
          >
            {/* Perfectly flat resting container */}
            <div className="rounded-3xl p-8 border bg-white border-slate-200 shadow-[0_10px_40px_rgb(0,0,0,0.06)] dark:bg-[#0d1726] dark:border-[#F39200]/12 dark:shadow-[0_0_40px_rgba(243,146,0,0.06),0_30px_60px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(243,146,0,0.1)", border: "1px solid rgba(243,146,0,0.25)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9h12M9 3v12" stroke="#F39200" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="9" cy="9" r="2" fill="#F39200"/>
                  </svg>
                </div>
                <div>
                  <h3 className={`font-bold text-foreground text-lg ${thai ? "font-thai leading-relaxed" : "font-syne"}`}>{t.simulator.skillCalibration}</h3>
                  <p className={`text-xs text-muted-foreground ${thai ? "font-thai leading-relaxed" : "font-dm"}`}>{t.simulator.dragSliders}</p>
                </div>
              </div>

              {/* Sliders Staggered Container */}
              <motion.div
                className="flex flex-col gap-8"
                variants={slidersContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
              >
                {skills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    variants={sliderItemVariants}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: skill.color, boxShadow: `0 0 8px ${skill.color}` }}
                        />
                        <span className="text-sm font-dm text-foreground">{skill.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.span
                          key={skill.value}
                          initial={{ scale: 1.4 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="font-syne font-bold text-lg tabular-nums w-8 text-right text-foreground"
                        >
                          {skill.value}
                        </motion.span>
                        <span className="text-xs font-dm text-muted-foreground">/100</span>
                      </div>
                    </div>

                    {/* Precision slider with custom styling */}
                    <div className="relative">
                      <Slider
                        value={[skill.value]}
                        onValueChange={([v]) => updateSkill(skill.id, v)}
                        min={0}
                        max={100}
                        step={1}
                        className="precision-slider"
                      />
                    </div>

                    {/* Level indicator */}
                    <div className="flex justify-between mt-1.5 text-xs font-dm text-muted-foreground">
                      <span>0</span>
                      <span
                        className={`text-xs ${thai ? "font-thai leading-relaxed" : "font-dm"}`}
                        style={{ color: skill.color + "80" }}
                      >
                        {skill.value < 30 ? t.simulator.novice : skill.value < 60 ? t.simulator.intermediate : skill.value < 80 ? t.simulator.advanced : t.simulator.expert}
                      </span>
                      <span>100</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Reset button */}
              <motion.button
                onClick={() => setSkills(initialSkills)}
                className={`mt-8 w-full py-3 rounded-full border border-slate-200 dark:border-white/10 text-muted-foreground hover:text-foreground hover:border-slate-300 dark:hover:border-white/20 text-sm transition-colors ${thai ? "font-thai leading-relaxed" : "font-dm"}`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {t.simulator.resetBaseline}
              </motion.button>
            </div>
          </motion.div>

          {/* Right: Live Rankings sticky layout with 3D Reveal wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 25 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", bounce: 0.3, duration: 1, delay: 0.15 }}
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            className="lg:sticky lg:top-24 z-20 self-start w-full"
          >
            {/* Perfectly flat resting container */}
            <div className="rounded-3xl p-8 border bg-white border-slate-200 shadow-[0_10px_40px_rgb(0,0,0,0.06)] dark:bg-[#0d1726] dark:border-[#1E90FF]/12 dark:shadow-[0_0_40px_rgba(30,144,255,0.06),0_30px_60px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(30,144,255,0.1)", border: "1px solid rgba(30,144,255,0.25)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2l2.5 5 5.5.8-4 3.9.9 5.5L9 14.5 4.1 17.2l.9-5.5L1 7.8 6.5 7z" stroke="#1E90FF" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
                <div>
                  <h3 className={`font-bold text-foreground text-lg ${thai ? "font-thai leading-relaxed" : "font-syne"}`}>{t.simulator.liveRankings}</h3>
                  <p className={`text-xs text-muted-foreground ${thai ? "font-thai leading-relaxed" : "font-dm"}`}>{t.simulator.liveRankingsSub}</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                  <span className="text-xs font-dm text-[#4ADE80]">Live</span>
                </div>
              </div>

              {/* Animated career cards */}
              <div className="flex flex-col gap-4">
                <AnimatePresence mode="popLayout">
                  {matches.map(({ career, match }, i) => (
                    <MatchCard
                      key={career.id}
                      career={career}
                      match={match}
                      rank={i + 1}
                      index={i}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Insight callout */}
              <motion.div
                className="mt-6 p-4 rounded-2xl"
                style={{
                  background: "rgba(243,146,0,0.05)",
                  border: "1px solid rgba(243,146,0,0.15)",
                }}
                animate={{ borderColor: ["rgba(243,146,0,0.1)", "rgba(243,146,0,0.25)", "rgba(243,146,0,0.1)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {thai ? (
                  <p className="text-xs text-muted-foreground leading-relaxed font-thai">
                    <span className="text-[#F39200] font-semibold">เคล็ดลับ:</span> การเพิ่มทักษะ{" "}
                    <span className="text-foreground">Machine Learning</span> อีก 20 คะแนน จะช่วยเพิ่มโอกาสแมตช์กับ{" "}
                    <span className="text-foreground">Data Scientist</span> ถึง{" "}
                    <span className="text-[#F39200] font-semibold">+7%</span>
                  </p>
                ) : (
                  <p className="text-xs font-dm text-muted-foreground leading-relaxed">
                    <span className="text-[#F39200] font-semibold">Tip:</span> Increasing your{" "}
                    <span className="text-foreground">Machine Learning</span> score by 20 points would boost your Data Scientist match by approximately{" "}
                    <span className="text-[#F39200] font-semibold">+7%</span>.
                  </p>
                )}
              </motion.div>

              {/* Action */}
              <motion.button
                className={`mt-4 w-full py-4 rounded-full font-bold text-[#050A14] text-sm tracking-wide ${thai ? "font-thai leading-relaxed" : "font-syne"}`}
                style={{
                  background: "linear-gradient(135deg, #F39200, #FFB84D)",
                  boxShadow: "0 0 20px rgba(243,146,0,0.3)",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(243,146,0,0.5)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {t.simulator.generateRoadmap}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
