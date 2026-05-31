/**
 * CARIA-GAP Stats Section — Precision Instrument UI
 * Design: Horizontal stats bar with animated counters, thin dividers
 * Framer Motion: scroll-triggered counter animation
 */
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, { duration: 1.8, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, target, count]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  { value: 66, suffix: "", label: "Digital Competencies", sublabel: "SFIA Framework" },
  { value: 3, suffix: "-Axis", label: "Evaluation Model", sublabel: "Attitude · Knowledge · Application" },
  { value: 95, suffix: "%", label: "Match Accuracy", sublabel: "Validated against industry data" },
  { value: 12, suffix: "+", label: "Career Pathways", sublabel: "Across digital disciplines" },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 relative overflow-hidden" style={{ background: "#050A14" }}>
      {/* Horizontal glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(30,144,255,0.2), rgba(243,146,0,0.2), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(30,144,255,0.1), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="px-8 py-6 text-center first:pl-0 last:pr-0"
            >
              <div
                className="font-syne font-extrabold text-4xl lg:text-5xl mb-2"
                style={{ color: i % 2 === 0 ? "#F39200" : "#1E90FF" }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-syne font-semibold text-white text-sm mb-1">{stat.label}</div>
              <div className="text-xs font-dm text-white/35">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
