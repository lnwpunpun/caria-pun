"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MOCK_GAP_ANALYSIS } from "@/lib/mockData";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const getRadarData = (tab: "skills" | "attitudes" | "knowledge") => {
  const data = MOCK_GAP_ANALYSIS.radar_data[`drilldown_${tab}`];
  return data.labels.map((label, i) => ({
    subject: label,
    student: data.student_scores[i],
    career: data.career_scores[i],
    fullMark: 100,
  }));
};

const gapDetails = MOCK_GAP_ANALYSIS.gaps.map((g) => ({
  skill: g.competency_id.replace(/^[ASK]\d{2}_/, "").replace(/_/g, " "),
  student: g.student_score,
  required: g.career_required,
  gap: g.gap_score,
  priority: g.gap_score >= 30 ? "Critical" : g.gap_score >= 20 ? "High" : "Medium",
}));

const priorityColors: Record<string, string> = {
  Critical: "#EF4444",
  High: "#F39200",
  Medium: "#1E90FF",
};

// Custom tooltip for radar
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        className="rounded-xl p-4 text-sm shadow-2xl backdrop-blur-md"
        style={{
          background: "rgba(10, 15, 28, 0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <p className="text-white font-bold mb-3 border-b border-white/10 pb-2">{data.subject}</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span>🔵</span>
            <span className="text-white/70">Career Required:</span>
            <span className="text-white font-semibold ml-auto">{data.career}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🟠</span>
            <span className="text-white/70">Your Profile:</span>
            <span className="text-white font-semibold ml-auto">{data.student}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function GapAnalysisSection() {
  const [activeTab, setActiveTab] = useState<"skills" | "attitudes" | "knowledge">("skills");
  const radarData = getRadarData(activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="gap-analysis" className="py-24 relative bg-[#0a0f1c] overflow-hidden font-sans">
      {/* Ambient glowing background accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,136,254,0.05) 0%, transparent 70%)",
        }}
      />

      {/* 3D Animation wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 80, rotateX: 15, perspective: 1000 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ type: "spring", bounce: 0.4, duration: 1.2 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 relative z-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-4xl lg:text-5xl text-white mb-4 tracking-tight">
            Competency Radar
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            A 3-axis drill-down view comparing your current profile against career requirements across all dimensions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Radar Chart Panel */}
          <div
            className="lg:col-span-3 rounded-[2rem] overflow-hidden backdrop-blur-md"
            style={{
              background: "linear-gradient(135deg, rgba(13,26,48,0.7) 0%, rgba(5,10,20,0.8) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.02)",
            }}
          >
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 shadow-inner">
                  {(["skills", "attitudes", "knowledge"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                        activeTab === t
                          ? "bg-[#0088FE] text-white shadow-[0_0_15px_rgba(0,136,254,0.5)]"
                          : "text-white/50 hover:text-white/90"
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-5 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 rounded-full bg-[#0088FE] shadow-[0_0_8px_#0088FE]" />
                    <span className="text-white/70">Career Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 rounded-full bg-[#F39200] shadow-[0_0_8px_#F39200]" />
                    <span className="text-white/70">Your Profile</span>
                  </div>
                </div>
              </div>

              {/* Recharts Radar */}
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                    <PolarGrid stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                      stroke="rgba(255,255,255,0.1)"
                      tickCount={6}
                    />
                    <Radar
                      name="Career Required"
                      dataKey="career"
                      stroke="#0088FE"
                      strokeWidth={3}
                      fill="transparent"
                      dot={{ fill: "#0088FE", r: 4, strokeWidth: 2, stroke: "#000" }}
                      style={{ filter: "drop-shadow(0 0 10px rgba(0,136,254,0.8))" }}
                    />
                    <Radar
                      name="Your Profile"
                      dataKey="student"
                      stroke="#F39200"
                      strokeWidth={2}
                      fill="#F39200"
                      fillOpacity={0.3}
                      dot={{ fill: "#F39200", r: 4, strokeWidth: 0 }}
                      style={{ filter: "drop-shadow(0 0 6px rgba(243,146,0,0.5))" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Priority Gaps List */}
          <div
            className="lg:col-span-2 rounded-[2rem] p-8 h-full backdrop-blur-md flex flex-col"
            style={{
              background: "linear-gradient(135deg, rgba(13,26,48,0.7) 0%, rgba(5,10,20,0.8) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div className="mb-8">
              <h3 className="font-extrabold text-white text-2xl mb-1 tracking-tight">Priority Gaps</h3>
              <p className="text-sm text-white/50">Ranked by impact on career match score</p>
            </div>

            <motion.ul
              className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2 custom-scrollbar"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {gapDetails.map((item) => (
                <motion.li
                  key={item.skill}
                  variants={itemVariants}
                  className="group relative rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" 
                    style={{ 
                      boxShadow: `inset 0 0 20px ${priorityColors[item.priority]}15`, 
                      border: `1px solid ${priorityColors[item.priority]}40`, 
                    }} 
                  />
                  
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <span className="text-base font-semibold text-white tracking-wide">{item.skill}</span>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider"
                      style={{
                        background: `${priorityColors[item.priority]}20`,
                        color: priorityColors[item.priority],
                        border: `1px solid ${priorityColors[item.priority]}50`,
                      }}
                    >
                      {item.priority}
                    </span>
                  </div>

                  {/* Overlapping Progress Bar */}
                  <div className="relative h-2.5 rounded-full bg-white/5 overflow-hidden mb-3 z-10">
                    {/* Required bar (Blue background) */}
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ width: `${item.required}%`, background: "#0088FE", opacity: 0.3 }}
                    />
                    {/* Student bar (Orange foreground) */}
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ width: `${item.student}%`, background: "#F39200", boxShadow: "0 0 10px #F39200" }}
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${item.student}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  </div>

                  <div className="relative z-10 flex justify-between text-sm font-medium">
                    <span className="text-white/60">Score: <span className="text-white">{item.student}</span></span>
                    <span className="text-[#EF4444] font-bold">Gap: {item.gap}</span>
                    <span className="text-white/60">Req: <span className="text-white">{item.required}</span></span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
