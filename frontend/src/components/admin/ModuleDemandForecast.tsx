"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MODULE_DEMAND_FORECAST } from "@/lib/adminStats";

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  color: "var(--popover-foreground)",
  fontSize: 12,
  boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
};

export function ModuleDemandForecast() {
  const data = MODULE_DEMAND_FORECAST.map((m) => ({
    name: m.name_th,
    current: m.current_term,
    forecast: m.next_term_forecast,
    delta: m.next_term_forecast - m.current_term,
  }));

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgb(0,0,0,0.05)] dark:border-white/10 dark:bg-[#0d1726] dark:shadow-none font-thai">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground">คาดการณ์ความต้องการโมดูลเทอมหน้า</h3>
        <span className="rounded-full bg-[#2563EB]/10 px-2.5 py-1 text-[10px] font-semibold text-[#2563EB]">Forecast</span>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        จำนวนนักศึกษาที่คาดว่าจะเลือกเรียนแต่ละโมดูล — ช่วยวางแผนเปิดวิชา/จัดอาจารย์
      </p>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} interval={0} angle={-18} textAnchor="end" height={64} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(148,163,184,0.12)" }} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 4 }} />
            <Bar dataKey="current" name="เทอมนี้" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={16} />
            <Bar dataKey="forecast" name="คาดการณ์เทอมหน้า" fill="#F39200" radius={[4, 4, 0, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
