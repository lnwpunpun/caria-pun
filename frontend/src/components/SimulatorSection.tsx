/**
 * CARIA-GAP What-If Simulator — Premium AI Command Center
 * Same MES logic & state, upgraded to a cinematic glassmorphism UI:
 * glowing sliders, live re-ranking with fluid bars, real-time delta badges,
 * an AI-suggestion callout, and a gradient CTA.
 */
"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MOCK_TOP10, MOCK_GAP_ANALYSIS } from "@/lib/mockData";
import { useLanguage } from "@/components/language-provider";
import { BrainCircuit, Sparkles, RotateCcw, ArrowUp, Target, Briefcase, PenTool, Palette, Rocket, SlidersHorizontal } from "lucide-react";

// Animated number ticker
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

const SKILL_ICONS = [Target, Briefcase, PenTool, Palette, Rocket];

const initialSkills = MOCK_GAP_ANALYSIS.gaps.slice(0, 5).map((g, i) => {
  const colors = ["#F39200", "#1E90FF", "#A78BFA", "#4ADE80", "#F472B6"];
  return {
    id: g.competency_id,
    label: g.competency_id.replace(/^[ASK]\d{2}_/, "").replace(/_/g, " "),
    value: g.student_score,
    originalValue: g.student_score,
    color: colors[i % colors.length],
  };
});

const careerTargets = MOCK_TOP10.top10_careers.slice(0, 3).map((c) => {
  return {
    id: c.career_id,
    title: c.career_name,
    base: c.match_percentage,
    weights: {
      [initialSkills[0]?.id]: 0.35,
      [initialSkills[1]?.id]: 0.2,
      [initialSkills[2]?.id]: 0.15,
      [initialSkills[3]?.id]: 0.2,
      [initialSkills[4]?.id]: 0.1,
    },
  };
});

function computeMatch(skills: typeof initialSkills, career: typeof careerTargets[0]) {
  let improvement = 0;
  skills.forEach((s) => {
    const diff = Math.max(0, s.value - s.originalValue);
    const w = career.weights[s.id as keyof typeof career.weights] || 0;
    improvement += (diff / 100) * w * 100;
  });
  return Math.min(99, Math.round(career.base + improvement));
}

const RANK_COLORS = ["#F39200", "#1E90FF", "#A78BFA"];

function MatchCard({
  career,
  match,
  rank,
  delta,
}: {
  career: typeof careerTargets[0];
  match: number;
  rank: number;
  delta: number;
}) {
  const displayMatch = useNumberTicker(match);
  const color = RANK_COLORS[rank - 1] || "#94a3b8";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="relative overflow-hidden rounded-2xl border bg-white p-4 dark:bg-white/[0.03]"
      style={{ borderColor: `${color}33`, boxShadow: rank === 1 ? `0 0 26px ${color}22` : undefined }}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="flex size-7 shrink-0 items-center justify-center rounded-full font-syne text-xs font-bold"
            style={{ background: `${color}1f`, color }}
          >
            #{rank}
          </div>
          <span className="truncate font-syne text-sm font-semibold text-foreground">{career.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {delta > 0 && (
              <motion.span
                initial={{ opacity: 0, x: 6, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-500"
              >
                +{delta}% <ArrowUp className="size-2.5" />
              </motion.span>
            )}
          </AnimatePresence>
          <motion.span
            key={match}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="font-syne text-2xl font-extrabold tabular-nums"
            style={{ color }}
          >
            {displayMatch}%
          </motion.span>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})`, boxShadow: `0 0 10px ${color}66` }}
          animate={{ width: `${match}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
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

  const matches = careerTargets
    .map((c) => ({ career: c, match: computeMatch(skills, c) }))
    .sort((a, b) => b.match - a.match);

  const levelText = (v: number) =>
    v < 30
      ? thai ? "ระดับเริ่มต้น" : "Novice"
      : v < 60
        ? thai ? "ระดับกลาง" : "Intermediate"
        : v < 80
          ? thai ? "ระดับสูง" : "Advanced"
          : thai ? "เชี่ยวชาญ" : "Expert";

  return (
    <section id="simulator" className="relative overflow-hidden bg-background py-24">
      {/* Cinematic ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/4 size-96 rounded-full bg-brand-orange/10 blur-[130px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-1/4 size-96 rounded-full bg-[#1E90FF]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F39200]/20 bg-[#F39200]/5 px-4 py-1.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#F39200]" />
            <span className={`text-xs text-[#F39200] ${thai ? "font-thai" : "font-dm tracking-widest uppercase"}`}>
              {t.simulator.eyebrow}
            </span>
          </div>
          <h2 className={`mb-4 text-4xl font-extrabold text-foreground lg:text-5xl ${thai ? "font-thai leading-snug" : "font-syne"}`}>
            {t.simulator.title}
          </h2>
          <p className={`mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl ${thai ? "font-thai leading-loose" : "font-dm leading-relaxed"}`}>
            {t.simulator.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          {/* LEFT: Competency Control */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.9 }}
            className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/60 md:p-8"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
                <SlidersHorizontal className="size-5" />
              </div>
              <div>
                <h3 className={`text-lg font-bold text-foreground ${thai ? "font-thai" : "font-syne"}`}>
                  {thai ? "จำลองการปรับระดับทักษะ" : "Skill Calibration"}
                </h3>
                <p className={`text-xs text-muted-foreground ${thai ? "font-thai" : "font-dm"}`}>
                  {thai ? "เลื่อนแถบเพื่อจำลองการพัฒนาทักษะ" : "Drag sliders to simulate upskilling"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-7">
              {skills.map((skill, i) => {
                const Icon = SKILL_ICONS[i % SKILL_ICONS.length];
                const changed = skill.value !== skill.originalValue;
                return (
                  <div key={skill.id}>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="size-4" style={{ color: skill.color }} />
                        <span className="text-sm font-medium text-foreground">{skill.label}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <motion.span
                          key={skill.value}
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className={`w-9 text-right font-syne text-lg font-extrabold tabular-nums ${changed ? "text-brand-orange" : "text-foreground"}`}
                        >
                          {skill.value}
                        </motion.span>
                        <span className="text-xs text-muted-foreground">/100</span>
                      </div>
                    </div>

                    {/* Glowing slider */}
                    <div className="relative">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={skill.value}
                        aria-label={skill.label}
                        onChange={(e) => updateSkill(skill.id, Number(e.target.value))}
                        className="caria-slider w-full"
                        style={{ "--val": `${skill.value}%` } as React.CSSProperties}
                      />
                    </div>

                    <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span className="font-medium" style={{ color: `${skill.color}` }}>
                        {levelText(skill.value)}
                      </span>
                      <span>100</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <motion.button
              onClick={() => setSkills(initialSkills)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-slate-300 hover:text-foreground dark:border-white/10 dark:hover:border-white/20"
            >
              <RotateCcw className="size-3.5" />
              {thai ? "รีเซ็ตค่าเริ่มต้น" : "Reset to Baseline"}
            </motion.button>
          </motion.div>

          {/* RIGHT: Live MES Prediction Engine */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.9, delay: 0.12 }}
            className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/60 md:p-8 lg:sticky lg:top-24"
          >
            <div className="mb-8 flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
                className="flex size-11 items-center justify-center rounded-2xl bg-[#1E90FF]/10 text-[#1E90FF]"
              >
                <BrainCircuit className="size-5" />
              </motion.div>
              <div>
                <h3 className={`text-lg font-bold text-foreground ${thai ? "font-thai" : "font-syne"}`}>
                  {thai ? "อันดับอาชีพแบบเรียลไทม์" : "Live Rankings"}
                </h3>
                <p className={`text-xs text-muted-foreground ${thai ? "font-thai" : "font-dm"}`}>
                  {thai ? "อัปเดตทันทีเมื่อปรับระดับทักษะ" : "Updates as you calibrate skills"}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-emerald-500">Live</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {matches.map(({ career, match }, i) => (
                  <MatchCard
                    key={career.id}
                    career={career}
                    match={match}
                    rank={i + 1}
                    delta={match - career.base}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* AI Suggestion */}
            <motion.div
              animate={{ boxShadow: ["0 0 0px rgba(243,146,0,0)", "0 0 18px rgba(243,146,0,0.22)", "0 0 0px rgba(243,146,0,0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mt-6 rounded-2xl border border-brand-orange/30 bg-brand-orange/[0.06] p-4"
            >
              <div className="flex gap-3">
                <Sparkles className="size-5 shrink-0 text-brand-orange" />
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-brand-orange">AI Suggestion</p>
                  <p className={`text-xs leading-relaxed text-muted-foreground ${thai ? "font-thai leading-loose" : ""}`}>
                    {thai ? (
                      <>
                        การเพิ่มทักษะ <span className="font-semibold text-foreground">Machine Learning</span> อีก 20 คะแนน
                        จะช่วยเพิ่มโอกาสแมตช์กับ <span className="font-semibold text-foreground">Data Scientist</span> ได้ถึง{" "}
                        <span className="font-semibold text-brand-orange">+7%</span>
                      </>
                    ) : (
                      <>
                        Increasing your <span className="font-semibold text-foreground">Machine Learning</span> score by 20 points
                        would boost your <span className="font-semibold text-foreground">Data Scientist</span> match by approximately{" "}
                        <span className="font-semibold text-brand-orange">+7%</span>.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Grand CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`mt-4 w-full rounded-full bg-gradient-to-r from-[#F39200] to-[#E0700A] px-6 py-4 text-center font-bold text-white shadow-[0_0_20px_rgba(243,146,0,0.4)] transition-shadow hover:shadow-[0_0_30px_rgba(243,146,0,0.6)] ${thai ? "font-thai" : "font-syne"}`}
            >
              {thai ? "สร้างแผนการเรียนรู้ของคุณ →" : "Generate My Learning Roadmap →"}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
