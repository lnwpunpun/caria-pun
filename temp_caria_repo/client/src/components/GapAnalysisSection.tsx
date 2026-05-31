/**
 * CARIA-GAP Gap Analysis Section — Precision Instrument UI
 * Design: Futuristic 3-axis radar chart (Recharts), dark bg, glowing polygons
 * Framer Motion: scroll-triggered reveal, radar draws itself
 */
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const RADAR_BG_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663715925716/C5srhVpvKrV4qWgj4NxM6w/radar-bg-nr5Yv58vWVwxFMq2rMpVLo.webp";

const radarData = [
  { subject: "Data Analysis", student: 72, career: 90, fullMark: 100 },
  { subject: "Cloud Skills", student: 45, career: 85, fullMark: 100 },
  { subject: "AI/ML", student: 60, career: 95, fullMark: 100 },
  { subject: "Cybersecurity", student: 38, career: 80, fullMark: 100 },
  { subject: "DevOps", student: 55, career: 75, fullMark: 100 },
  { subject: "Communication", student: 82, career: 70, fullMark: 100 },
  { subject: "Leadership", student: 68, career: 65, fullMark: 100 },
  { subject: "Problem Solving", student: 78, career: 88, fullMark: 100 },
];

const gapDetails = [
  { skill: "AI/ML Fundamentals", student: 60, required: 95, gap: 35, priority: "Critical" },
  { skill: "Cloud Architecture", student: 45, required: 85, gap: 40, priority: "Critical" },
  { skill: "Cybersecurity", student: 38, required: 80, gap: 42, priority: "High" },
  { skill: "Data Analysis", student: 72, required: 90, gap: 18, priority: "Medium" },
  { skill: "DevOps Practices", student: 55, required: 75, gap: 20, priority: "Medium" },
];

const priorityColors: Record<string, string> = {
  Critical: "#EF4444",
  High: "#F39200",
  Medium: "#1E90FF",
};

// Custom tooltip for radar
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="glass-panel rounded-xl p-3 text-xs font-dm"
        style={{ border: "1px solid rgba(243,146,0,0.2)" }}
      >
        <p className="text-white font-semibold mb-1">{payload[0]?.payload?.subject}</p>
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span style={{ color: p.color }}>{p.name}: </span>
            <span className="text-white">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function GapAnalysisSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState<"radar" | "gaps">("radar");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const radarRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -8]);
  const radarScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.98]);
  const gapPanelRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-12, 0, 8]);

  return (
    <section id="gap-analysis" className="py-24 relative" style={{ background: "#050A14" }}>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,144,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1E90FF]/20 bg-[#1E90FF]/5 mb-5">
            <div className="w-2 h-2 rounded-full bg-[#1E90FF]" />
            <span className="text-xs font-dm text-[#1E90FF] tracking-widest uppercase">
              Gap Analysis
            </span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl lg:text-5xl text-white mb-4">
            Competency Radar
          </h2>
          <p className="text-white/50 font-dm text-lg max-w-xl mx-auto">
            A 3-axis drill-down view comparing your current profile against career requirements across all dimensions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Radar Chart Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: 8 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{ perspective: 1200, rotateX: radarRotateX, scale: radarScale }}
            className="lg:col-span-3"
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(5,10,20,0.98) 0%, rgba(13,26,48,0.95) 100%)",
                border: "1px solid rgba(30,144,255,0.15)",
                boxShadow: "0 0 60px rgba(30,144,255,0.08), 0 40px 80px rgba(0,0,0,0.5)",
              }}
            >
              {/* HUD background */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage: `url(${RADAR_BG_URL})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(30,144,255,0.5), transparent)" }}
              />

              <div className="relative p-8">
                {/* Chart header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-syne font-bold text-white text-lg">Competency Radar</h3>
                    <p className="text-xs font-dm text-white/40 mt-0.5">Data Scientist pathway</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 rounded-full bg-[#F39200]" style={{ boxShadow: "0 0 6px #F39200" }} />
                      <span className="text-xs font-dm text-white/50">Your Profile</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 rounded-full bg-[#1E90FF]" style={{ boxShadow: "0 0 6px #1E90FF" }} />
                      <span className="text-xs font-dm text-white/50">Career Required</span>
                    </div>
                  </div>
                </div>

                {/* Recharts Radar */}
                <div className="h-[380px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                      <PolarGrid
                        stroke="rgba(30,144,255,0.12)"
                        strokeWidth={1}
                      />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{
                          fill: "rgba(255,255,255,0.5)",
                          fontSize: 11,
                          fontFamily: "DM Sans",
                        }}
                        stroke="rgba(30,144,255,0.1)"
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 9 }}
                        stroke="rgba(30,144,255,0.08)"
                        tickCount={5}
                      />
                      <Radar
                        name="Career Required"
                        dataKey="career"
                        stroke="#1E90FF"
                        strokeWidth={2}
                        fill="#1E90FF"
                        fillOpacity={0.08}
                        dot={{ fill: "#1E90FF", r: 3, strokeWidth: 0 }}
                        style={{ filter: "drop-shadow(0 0 6px rgba(30,144,255,0.6))" }}
                      />
                      <Radar
                        name="Your Profile"
                        dataKey="student"
                        stroke="#F39200"
                        strokeWidth={2}
                        fill="#F39200"
                        fillOpacity={0.12}
                        dot={{ fill: "#F39200", r: 3, strokeWidth: 0 }}
                        style={{ filter: "drop-shadow(0 0 6px rgba(243,146,0,0.6))" }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Overall score */}
                <div className="flex items-center justify-center gap-8 pt-4 border-t border-white/6">
                  <div className="text-center">
                    <div className="font-syne font-extrabold text-2xl text-[#F39200]">74%</div>
                    <div className="text-xs font-dm text-white/40">Overall Match</div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <div className="font-syne font-extrabold text-2xl text-[#1E90FF]">26%</div>
                    <div className="text-xs font-dm text-white/40">Gap to Close</div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <div className="font-syne font-extrabold text-2xl text-white">8</div>
                    <div className="text-xs font-dm text-white/40">Dimensions</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gap Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -8 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ perspective: 1200, rotateY: gapPanelRotateY }}
            className="lg:col-span-2"
          >
            <div
              className="rounded-3xl overflow-hidden h-full"
              style={{
                background: "linear-gradient(135deg, rgba(13,26,48,0.95) 0%, rgba(5,10,20,0.98) 100%)",
                border: "1px solid rgba(243,146,0,0.1)",
                boxShadow: "0 0 40px rgba(243,146,0,0.06), 0 30px 60px rgba(0,0,0,0.4)",
              }}
            >
              <div className="p-6">
                <h3 className="font-syne font-bold text-white text-lg mb-1">Priority Gaps</h3>
                <p className="text-xs font-dm text-white/40 mb-6">Ranked by impact on career match score</p>

                <div className="flex flex-col gap-4">
                  {gapDetails.map((item, i) => (
                    <motion.div
                      key={item.skill}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-dm text-white/80">{item.skill}</span>
                        <span
                          className="text-xs font-dm px-2 py-0.5 rounded-full"
                          style={{
                            background: `${priorityColors[item.priority]}15`,
                            color: priorityColors[item.priority],
                            border: `1px solid ${priorityColors[item.priority]}25`,
                          }}
                        >
                          {item.priority}
                        </span>
                      </div>

                      {/* Dual bar */}
                      <div className="relative h-2 rounded-full bg-white/5 overflow-hidden mb-1">
                        {/* Required bar (background) */}
                        <div
                          className="absolute inset-y-0 left-0 rounded-full opacity-20"
                          style={{
                            width: `${item.required}%`,
                            background: "#1E90FF",
                          }}
                        />
                        {/* Student bar */}
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${priorityColors[item.priority]}80, ${priorityColors[item.priority]})`,
                          }}
                          initial={{ width: "0%" }}
                          animate={inView ? { width: `${item.student}%` } : {}}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                        />
                      </div>

                      <div className="flex justify-between text-xs font-dm text-white/30">
                        <span>You: {item.student}</span>
                        <span className="text-[#EF4444]">Gap: -{item.gap}</span>
                        <span>Need: {item.required}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Action button */}
                <motion.button
                  className="mt-6 w-full py-3 rounded-full border border-[#F39200]/25 text-[#F39200] font-syne font-semibold text-sm tracking-wide hover:bg-[#F39200]/5 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  View Full Gap Report →
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
