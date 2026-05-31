/**
 * CARIA-GAP Assessment Section — Precision Instrument UI
 * Design: Centered card, precision sliders, attitude questions
 * Framer Motion: scroll-reveal, slider spring animations
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";

const questions = [
  {
    id: "q1",
    category: "Attitude",
    label: "I actively seek out new digital technologies to solve problems.",
    value: 72,
  },
  {
    id: "q2",
    category: "Knowledge",
    label: "I understand cloud computing architectures and deployment models.",
    value: 58,
  },
  {
    id: "q3",
    category: "Application",
    label: "I can design and implement data pipelines for analytics workflows.",
    value: 45,
  },
  {
    id: "q4",
    category: "Attitude",
    label: "I embrace continuous learning in rapidly evolving tech environments.",
    value: 85,
  },
];

const categoryColors: Record<string, string> = {
  Attitude: "#F39200",
  Knowledge: "#1E90FF",
  Application: "#A78BFA",
};

function AssessmentSlider({
  question,
  index,
}: {
  question: (typeof questions)[0];
  index: number;
}) {
  const [value, setValue] = useState(question.value);
  const color = categoryColors[question.category];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="group"
    >
      <div className="flex items-start justify-between mb-3 gap-4">
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
          <p className="text-sm font-dm text-white/70 leading-relaxed">{question.label}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <motion.span
            key={value}
            initial={{ scale: 1.3, color: color }}
            animate={{ scale: 1, color: "#ffffff" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="font-syne font-bold text-lg tabular-nums"
          >
            {value}
          </motion.span>
          <span
            className="text-xs font-dm px-2 py-0.5 rounded-full"
            style={{ background: `${color}15`, color: color, border: `1px solid ${color}25` }}
          >
            {question.category}
          </span>
        </div>
      </div>

      {/* Custom precision slider */}
      <div className="relative py-2">
        <div
          className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none"
          style={{ padding: "0 10px" }}
        >
          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((tick) => (
            <div
              key={tick}
              className="absolute w-px h-2"
              style={{
                left: `calc(${tick}% + 10px * ${1 - tick / 100})`,
                background: "rgba(255,255,255,0.1)",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          ))}
        </div>
        <Slider
          value={[value]}
          onValueChange={([v]) => setValue(v)}
          min={0}
          max={100}
          step={1}
          className="precision-slider"
          style={
            {
              "--slider-color": color,
            } as React.CSSProperties
          }
        />
      </div>

      {/* Level labels */}
      <div className="flex justify-between mt-1">
        <span className="text-xs font-dm text-white/25">Novice</span>
        <span className="text-xs font-dm text-white/25">Expert</span>
      </div>
    </motion.div>
  );
}

export default function AssessmentSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="assessment" className="py-24 relative" style={{ background: "#050A14" }}>
      {/* Divider glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, rgba(243,146,0,0.3), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ perspective: 800 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F39200]/20 bg-[#F39200]/5 mb-5">
              <div className="w-2 h-2 rounded-full bg-[#F39200]" />
              <span className="text-xs font-dm text-[#F39200] tracking-widest uppercase">
                Hybrid Assessment
              </span>
            </div>
            <h2 className="font-syne font-extrabold text-4xl lg:text-5xl text-white mb-5 leading-tight">
              Calibrate Your
              <br />
              <span className="text-[#F39200]">Competency Profile</span>
            </h2>
            <p className="text-white/55 font-dm text-lg leading-relaxed mb-8">
              Our precision assessment engine evaluates you across three dimensions — Attitude, Knowledge, and Application — for each of the 66 digital competencies defined by the SFIA framework.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: "⬡", label: "66 Competency Dimensions", color: "#F39200" },
                { icon: "◎", label: "3-Axis Evaluation Model", color: "#1E90FF" },
                { icon: "◈", label: "Real-time Gap Computation", color: "#A78BFA" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}25`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <span className="font-dm text-white/70 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Assessment Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            style={{ perspective: 1000 }}
          >
            <div
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(13,26,48,0.95) 0%, rgba(5,10,20,0.98) 100%)",
                border: "1px solid rgba(243,146,0,0.15)",
                boxShadow: "0 0 40px rgba(243,146,0,0.08), 0 40px 80px rgba(0,0,0,0.5)",
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-syne font-bold text-white text-lg">Competency Assessment</h3>
                  <p className="text-xs font-dm text-white/40 mt-0.5">Question 4 of 66</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F39200] animate-pulse" />
                  <span className="text-xs font-dm text-white/40">Live</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs font-dm text-white/30 mb-2">
                  <span>Progress</span>
                  <span>6% complete</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #1E90FF, #F39200)" }}
                    initial={{ width: "0%" }}
                    animate={inView ? { width: "6%" } : {}}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Sliders */}
              <div className="flex flex-col gap-7">
                {questions.map((q, i) => (
                  <AssessmentSlider key={q.id} question={q} index={i} />
                ))}
              </div>

              {/* Submit button */}
              <motion.button
                className="mt-8 w-full py-4 rounded-full font-syne font-bold text-[#050A14] text-sm tracking-wide"
                style={{
                  background: "linear-gradient(135deg, #F39200, #FFB84D)",
                  boxShadow: "0 0 20px rgba(243,146,0,0.3)",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(243,146,0,0.5)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Submit & Analyse →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
