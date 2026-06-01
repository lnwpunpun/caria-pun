"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CAREER_GROUP_DISTRIBUTION } from "@/lib/adminStats";

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  color: "var(--popover-foreground)",
  fontSize: 12,
  boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
};

export function CareerTrendPieChart() {
  const data = CAREER_GROUP_DISTRIBUTION;
  const top = data[0];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgb(0,0,0,0.05)] dark:border-white/10 dark:bg-[#0d1726] dark:shadow-none font-thai">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground">สัดส่วนสายอาชีพที่นักเรียนสนใจ</h3>
        <span className="rounded-full bg-[#F39200]/10 px-2.5 py-1 text-[10px] font-semibold text-[#F39200]">Career Trend</span>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        จาก {data.reduce((s, d) => s + d.count, 0)} คน — โมดูลที่ต้องการสูงสุดคือ{" "}
        <span className="font-semibold text-foreground">{top.nameTh}</span>
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative h-52 w-52 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={88}
                paddingAngle={3}
                dataKey="count"
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.group} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value: number, _name, item: any) => [`${value} คน (${item?.payload?.percentage}%)`, item?.payload?.nameTh]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-foreground">{data.length}</span>
            <span className="text-[10px] text-muted-foreground">โมดูล</span>
          </div>
        </div>

        <ul className="flex-1 space-y-2 self-stretch">
          {data.map((d) => (
            <li key={d.group} className="flex items-center gap-2.5 text-xs">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.color }} />
              <span className="flex-1 truncate text-foreground">{d.nameTh}</span>
              <span className="font-semibold tabular-nums text-muted-foreground">{d.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
