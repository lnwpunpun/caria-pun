"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { TrendingUp, Users, Award, ShieldAlert } from "lucide-react";

// Mock Aggregated Data for trends
const BRANCH_POPULARITY = [
  { name: "สาย DT (Technology)", value: 58, color: "#F39200" },
  { name: "สาย DC (Media)", value: 42, color: "#2563EB" },
];

const TOP_GROUPS = [
  { name: "Data Science (DT)", count: 2450, color: "#3B82F6" },
  { name: "Animation (DC)", count: 1890, color: "#EC4899" },
  { name: "Web Application (DT)", count: 1620, color: "#10B981" },
  { name: "Visual Design (DC)", count: 1430, color: "#F59E0B" },
  { name: "Cloud & Cyber (DT)", count: 1120, color: "#8B5CF6" },
];

const MONTHLY_TREND = [
  { month: "ม.ค.", assessments: 450, tech: 260, media: 190 },
  { month: "ก.พ.", assessments: 580, tech: 320, media: 260 },
  { month: "มี.ค.", assessments: 890, tech: 510, media: 380 },
  { month: "เม.ย.", assessments: 1100, tech: 680, media: 420 },
  { month: "พ.ค.", assessments: 1540, tech: 910, media: 630 },
  { month: "มิ.ย.", assessments: 1980, tech: 1150, media: 830 },
];

const COLORS = ["#F39200", "#2563EB", "#10B981", "#EC4899", "#8B5CF6"];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<"year" | "month">("year");

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-thai relative overflow-hidden flex flex-col">
      <Navbar />

      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 left-1/3 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-10 right-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <main className="flex-1 relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold md:text-4xl">
              <span className="bg-gradient-to-r from-accent via-orange-400 to-blue-400 bg-clip-text text-transparent">
                Public Trend Analytics
              </span>
            </h1>
            <p className="mt-2 text-sm text-white/60">
              กระดานวิเคราะห์สถิติสาธารณะ ความต้องการทางสายอาชีพและสมรรถนะของนักศึกษารายปี
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex rounded-lg border border-white/10 p-1 bg-white/5 backdrop-blur-sm">
            <button
              onClick={() => setTimeframe("year")}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                timeframe === "year" ? "bg-accent text-white" : "text-white/60 hover:text-white"
              }`}
            >
              รายปี (2026)
            </button>
            <button
              onClick={() => setTimeframe("month")}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                timeframe === "month" ? "bg-accent text-white" : "text-white/60 hover:text-white"
              }`}
            >
              รายเดือนย้อนหลัง
            </button>
          </div>
        </div>

        {/* Stats Grid Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">ผู้เข้าร่วมการประเมิน</span>
              <h3 className="text-2xl font-extrabold font-syne mt-0.5">8,450+ คน</h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">สายอาชีพยอดนิยม</span>
              <h3 className="text-2xl font-extrabold mt-0.5 text-blue-400">DT - เทคโนโลยี (58%)</h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-success/20 text-success flex items-center justify-center">
              <Award size={24} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">ความแม่นยำของโมเดลแนะนำ</span>
              <h3 className="text-2xl font-extrabold font-syne mt-0.5 text-success">83.2%</h3>
            </div>
          </div>

        </div>

        {/* Graphs Section */}
        <div className="grid gap-8 lg:grid-cols-2 mb-10">
          
          {/* Chart 1: Pie Chart Branch Popularity */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold mb-1">สัดส่วนความสนใจจำแนกรายสาย</h3>
              <p className="text-[10px] text-white/50 mb-6">อัตราส่วนระหว่างสาย Digital Technology และ Digital Communication</p>
            </div>
            <div className="h-64 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={BRANCH_POPULARITY}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {BRANCH_POPULARITY.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0a0f1d", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }} 
                    itemStyle={{ color: "#fff" }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Top groups bar chart */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold mb-1">5 กลุ่มอาชีพยอดนิยมสูงสุด (Top Groups)</h3>
              <p className="text-[10px] text-white/50 mb-6">จัดอันดับตามความถี่ในการแนะนำอาชีพสอดคล้องระดับ Top 1</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TOP_GROUPS} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={9} width={100} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0a0f1d", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {TOP_GROUPS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Chart 3: Line Chart Monthly Assessments */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md mb-8">
          <div>
            <h3 className="text-base font-bold mb-1">อัตราการเข้าทำแบบประเมินและทิศทางสะสม</h3>
            <p className="text-[10px] text-white/50 mb-6">กราฟเส้นแสดงจำนวนผู้ทำประเมินรายเดือน แบ่งตามสายเทคโนโลยีและสื่อสาร</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_TREND} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0a0f1d", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend />
                <Line type="monotone" dataKey="assessments" name="รวมทุกสาย" stroke="#fff" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="tech" name="สาย DT (Tech)" stroke="#F39200" strokeWidth={1.5} />
                <Line type="monotone" dataKey="media" name="สาย DC (Media)" stroke="#2563EB" strokeWidth={1.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Informational Disclaimer Card */}
        <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs text-blue-300 flex items-start gap-2.5 max-w-3xl mx-auto">
          <ShieldAlert size={16} className="mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed">
            <strong>ข้อมูลเชิงลึกทางสถิติ:</strong> สถิตินี้คำนวณและประมวลผลจากข้อมูลผู้เข้าประเมินสมรรถนะผ่านโมเดล CARIA โดยตรง ระบบจะสรุปแบบวิเคราะห์ (Aggregated Metrics) เป็นระยะเพื่อช่วยให้ฝ่ายวิชาการ มทส. ทราบกระแสความต้องการสมรรถนะของนักศึกษาและอัปเดตหลักสูตรวิชาให้สอดรับความเปลี่ยนแปลงในตลาดอาชีพยุคใหม่
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
