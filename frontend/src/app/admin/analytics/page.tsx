"use client";

import Link from "next/link";
import { ArrowLeft, Users, Layers, AlertTriangle, Target } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CareerTrendPieChart } from "@/components/admin/CareerTrendPieChart";
import { ModuleDemandForecast } from "@/components/admin/ModuleDemandForecast";
import { GapHeatmap } from "@/components/admin/GapHeatmap";
import { ADMIN_STATS, CAREER_GROUP_DISTRIBUTION, TOP_GAPS } from "@/lib/adminStats";

const topGroup = CAREER_GROUP_DISTRIBUTION[0];
const topGap = TOP_GAPS[0];

const KPIS = [
  { icon: Users, label: "ผู้เข้าประเมิน (รุ่น 2569)", value: `${ADMIN_STATS.total_assessments} คน`, tint: "text-[#2563EB] bg-[#2563EB]/10" },
  { icon: Layers, label: "โมดูลที่ต้องการสูงสุด", value: topGroup.nameTh, tint: "text-[#F39200] bg-[#F39200]/10" },
  { icon: AlertTriangle, label: "Gap รุนแรงที่สุด", value: topGap.label_th, tint: "text-red-500 bg-red-500/10" },
  { icon: Target, label: "ความแม่นยำโมเดล MES", value: `${ADMIN_STATS.model_accuracy}%`, tint: "text-emerald-500 bg-emerald-500/10" },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground font-thai">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/4 h-[480px] w-[480px] rounded-full bg-[#2563EB]/10 blur-[120px] dark:bg-[#2563EB]/15" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[#F39200]/8 blur-[110px]" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-2 text-xs font-semibold text-slate-600 backdrop-blur transition-colors hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
          >
            <ArrowLeft className="size-4" />
            กลับหน้าหลัก
          </Link>
          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="mb-8 border-b border-border pb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F39200]/30 bg-[#F39200]/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#F39200]">
            ● DIGITECH FACULTY ANALYTICS (B2B)
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            แดชบอร์ดวิเคราะห์หลักสูตร
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            ข้อมูลภาพรวมจากแบบประเมินสมรรถนะของนักเรียน ช่วยให้ฝ่ายวิชาการ มทส. วางแผนเปิดวิชา
            ปรับปรุงหลักสูตร และทำการตลาดได้แม่นยำแบบ data-driven
          </p>
        </div>

        {/* KPI cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((kpi) => (
            <div
              key={kpi.label}
              className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-white/10 dark:bg-[#0d1726] dark:shadow-none"
            >
              <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${kpi.tint}`}>
                <kpi.icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium text-muted-foreground">{kpi.label}</p>
                <p className="truncate text-lg font-extrabold leading-tight">{kpi.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts grid */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CareerTrendPieChart />
          <ModuleDemandForecast />
        </div>

        {/* Gap heatmap — centerpiece */}
        <div className="mb-6">
          <GapHeatmap />
        </div>

        {/* B2B insight callout */}
        <div className="flex items-start gap-3 rounded-2xl border border-[#2563EB]/20 bg-[#2563EB]/5 p-4 text-xs leading-relaxed text-muted-foreground">
          <Target className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
          <p>
            <span className="font-semibold text-foreground">Insight สำหรับผู้บริหาร:</span>{" "}
            นักศึกษากว่า 70% มี Gap ด้าน <span className="font-semibold text-foreground">{topGap.label_th}</span>{" "}
            แนะนำให้เพิ่มวิชาเลือกหรือ workshop เสริมในโมดูล{" "}
            <span className="font-semibold text-foreground">{topGroup.nameTh}</span>{" "}
            ซึ่งเป็นโมดูลที่มีดีมานด์สูงสุด เพื่อปิด Gap และลด dropout rate
          </p>
        </div>
      </main>
    </div>
  );
}
