"use client";

import { TOP_GAPS, ADMIN_STATS } from "@/lib/adminStats";

// Interpolate amber (least severe) → deep red (most severe).
function heatColor(t: number): string {
  const a = [245, 158, 11]; // #F59E0B
  const b = [220, 38, 38]; //  #DC2626
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

export function GapHeatmap() {
  const total = ADMIN_STATS.total_assessments;
  const severities = TOP_GAPS.map((g) => Math.abs(g.avg_gap));
  const maxSev = Math.max(...severities);
  const minSev = Math.min(...severities);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgb(0,0,0,0.05)] dark:border-white/10 dark:bg-[#0d1726] dark:shadow-none font-thai">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground">Competency Gap Heatmap — จุดอ่อนทั้งรุ่น</h3>
        <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-500">Action Needed</span>
      </div>
      <p className="mb-5 text-xs text-muted-foreground">
        สมรรถนะที่นักศึกษาทั้งคณะขาดมากที่สุด (ค่าเฉลี่ย Gap ติดลบ) — ใช้วางแผนเปิดวิชาเลือก/ปรับหลักสูตร
      </p>

      <div className="space-y-3">
        {TOP_GAPS.map((g) => {
          const sev = Math.abs(g.avg_gap);
          const t = maxSev === minSev ? 0.5 : (sev - minSev) / (maxSev - minSev);
          const color = heatColor(t);
          const widthPct = (sev / maxSev) * 100;
          const belowPct = Math.round((g.students_below_threshold / total) * 100);
          return (
            <div key={g.competency_id} className="flex items-center gap-3">
              <div className="w-40 shrink-0">
                <p className="truncate text-sm font-medium text-foreground">{g.label_th}</p>
                <p className="truncate text-[10px] text-muted-foreground">{g.label_en}</p>
              </div>
              <div className="relative h-7 flex-1 overflow-hidden rounded-lg bg-slate-100 dark:bg-white/5">
                <div
                  className="flex h-full items-center justify-end rounded-lg px-2 transition-all"
                  style={{ width: `${widthPct}%`, background: color }}
                >
                  <span className="text-[11px] font-bold text-white tabular-nums">{g.avg_gap}</span>
                </div>
              </div>
              <div className="w-24 shrink-0 text-right">
                <p className="text-sm font-bold tabular-nums text-foreground">{belowPct}%</p>
                <p className="text-[10px] text-muted-foreground">{g.students_below_threshold}/{total} คน</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-2 text-[10px] text-muted-foreground">
        <span>น้อย</span>
        <div className="h-2 flex-1 rounded-full" style={{ background: "linear-gradient(90deg, #F59E0B, #DC2626)" }} />
        <span>รุนแรง</span>
      </div>
    </div>
  );
}
