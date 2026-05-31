/**
 * CARIA-GAP What-If Simulator — Precision Instrument UI
 * Design: Precision sliders, real-time number-ticker, live ranking updates
 * Framer Motion: number-ticker animation, card reorder spring, scroll reveal
 */
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

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

const initialSkills = [
  { id: "ml", label: "Machine Learning", value: 60, weight: 0.25, color: "#F39200" },
  { id: "cloud", label: "Cloud Architecture", value: 45, weight: 0.20, color: "#1E90FF" },
  { id: "data", label: "Data Analysis", value: 72, weight: 0.20, color: "#A78BFA" },
  { id: "security", label: "Cybersecurity", value: 38, weight: 0.15, color: "#4ADE80" },
  { id: "devops", label: "DevOps & CI/CD", value: 55, weight: 0.20, color: "#F472B6" },
];

const careerTargets = [
  { id: "ds", title: "Data Scientist", weights: { ml: 0.35, cloud: 0.10, data: 0.30, security: 0.05, devops: 0.20 }, base: 62 },
  { id: "ca", title: "Cloud Architect", weights: { ml: 0.10, cloud: 0.45, data: 0.10, security: 0.15, devops: 0.20 }, base: 48 },
  { id: "csa", title: "Cybersecurity Analyst", weights: { ml: 0.10, cloud: 0.15, data: 0.15, security: 0.40, devops: 0.20 }, base: 44 },
];

function computeMatch(skills: typeof initialSkills, career: typeof careerTargets[0]) {
  const score = skills.reduce((acc, skill) => {
    const w = career.weights[skill.id as keyof typeof career.weights] || 0;
    return acc + (skill.value / 100) * w * 100;
  }, 0);
  return Math.min(99, Math.round(score));
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
      className="relative rounded-2xl p-5 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(13,26,48,0.95) 0%, rgba(5,10,20,0.98) 100%)",
        border: `1px solid ${color}25`,
        boxShadow: rank === 1 ? `0 0 30px ${color}15` : "none",
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
          <span className="font-syne font-semibold text-white text-sm">{career.title}</span>
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
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const sliderPanelRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const rankingPanelRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);

  const updateSkill = (id: string, value: number) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, value } : s)));
  };

  // Compute matches and sort by score
  const matches = careerTargets
    .map((c) => ({ career: c, match: computeMatch(skills, c) }))
    .sort((a, b) => b.match - a.match);

  return (
    <section id="simulator" className="py-24 relative" style={{ background: "#050A14" }}>
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
            <span className="text-xs font-dm text-[#F39200] tracking-widest uppercase">
              What-If Simulator
            </span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl lg:text-5xl text-white mb-4">
            Explore Your Upskilling Path
          </h2>
          <p className="text-white/50 font-dm text-lg max-w-xl mx-auto">
            Adjust your skill levels and watch career match scores update in real-time. Find your optimal learning investment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Skill Sliders */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: 6 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{ perspective: 1000, rotateY: sliderPanelRotateY }}
          >
            <div
              className="rounded-3xl p-8"
              style={{
                background: "linear-gradient(135deg, rgba(13,26,48,0.95) 0%, rgba(5,10,20,0.98) 100%)",
                border: "1px solid rgba(243,146,0,0.12)",
                boxShadow: "0 0 40px rgba(243,146,0,0.06), 0 30px 60px rgba(0,0,0,0.4)",
              }}
            >
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
                  <h3 className="font-syne font-bold text-white text-lg">Skill Calibration</h3>
                  <p className="text-xs font-dm text-white/40">Drag sliders to simulate upskilling</p>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: skill.color, boxShadow: `0 0 8px ${skill.color}` }}
                        />
                        <span className="text-sm font-dm text-white/80">{skill.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.span
                          key={skill.value}
                          initial={{ scale: 1.4, color: skill.color }}
                          animate={{ scale: 1, color: "#ffffff" }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="font-syne font-bold text-lg tabular-nums w-8 text-right"
                        >
                          {skill.value}
                        </motion.span>
                        <span className="text-xs font-dm text-white/30">/100</span>
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
                    <div className="flex justify-between mt-1.5 text-xs font-dm text-white/20">
                      <span>0</span>
                      <span
                        className="font-dm text-xs"
                        style={{ color: skill.color + "80" }}
                      >
                        {skill.value < 30 ? "Novice" : skill.value < 60 ? "Intermediate" : skill.value < 80 ? "Advanced" : "Expert"}
                      </span>
                      <span>100</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Reset button */}
              <motion.button
                onClick={() => setSkills(initialSkills)}
                className="mt-8 w-full py-3 rounded-full border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 font-dm text-sm transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Reset to Baseline
              </motion.button>
            </div>
          </motion.div>

          {/* Right: Live Rankings */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -6 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ perspective: 1000, rotateY: rankingPanelRotateY }}
          >
            <div
              className="rounded-3xl p-8"
              style={{
                background: "linear-gradient(135deg, rgba(13,26,48,0.95) 0%, rgba(5,10,20,0.98) 100%)",
                border: "1px solid rgba(30,144,255,0.12)",
                boxShadow: "0 0 40px rgba(30,144,255,0.06), 0 30px 60px rgba(0,0,0,0.4)",
              }}
            >
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
                  <h3 className="font-syne font-bold text-white text-lg">Live Rankings</h3>
                  <p className="text-xs font-dm text-white/40">Updates as you calibrate skills</p>
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
                <p className="text-xs font-dm text-white/50 leading-relaxed">
                  <span className="text-[#F39200] font-semibold">Tip:</span> Increasing your{" "}
                  <span className="text-white/80">Machine Learning</span> score by 20 points would boost your Data Scientist match by approximately{" "}
                  <span className="text-[#F39200] font-semibold">+7%</span>.
                </p>
              </motion.div>

              {/* Action */}
              <motion.button
                className="mt-4 w-full py-4 rounded-full font-syne font-bold text-[#050A14] text-sm tracking-wide"
                style={{
                  background: "linear-gradient(135deg, #F39200, #FFB84D)",
                  boxShadow: "0 0 20px rgba(243,146,0,0.3)",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(243,146,0,0.5)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Generate My Learning Roadmap →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
