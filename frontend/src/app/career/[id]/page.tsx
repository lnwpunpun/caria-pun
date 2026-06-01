"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GapRadarChart, { PriorityGapsList } from "@/components/dashboard/GapAnalysisSection";
import WhatIfSlider from "@/components/WhatIfSlider";
import { GapBarChart } from "@/components/gap/GapBarChart";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/ui/Loading";
import { api } from "@/lib/api";
import { MOCK_GAP_ANALYSIS } from "@/lib/mockData";
import type { GapAnalysisResponse, CompetencyScores } from "@/types";
import { useLanguage } from "@/components/language-provider";
import { CourseMatcher } from "@/components/results/CourseMatcher";

export default function CareerGapPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const thai = lang === "th";
  const params = useParams();
  const searchParams = useSearchParams();

  const careerId = params.id as string;
  const userId = searchParams.get("user") || "demo_ton";

  const [data, setData] = useState<GapAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [animatedMatch, setAnimatedMatch] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getGapAnalysis(userId, careerId);
        setData(res);
      } catch {
        setData(MOCK_GAP_ANALYSIS);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId, careerId]);

  // Animated counter for match percentage
  useEffect(() => {
    if (!data) return;
    const target = data.match_percentage;
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setAnimatedMatch(target);
        clearInterval(timer);
      } else {
        setAnimatedMatch(Math.round(current * 10) / 10);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [data]);

  if (loading || !data) {
    return <Loading mode="fullpage" />;
  }

  // Build currentScores from gap + strength items
  const currentScores: CompetencyScores = {};
  data.gaps.forEach((g) => {
    currentScores[g.competency_id] = g.student_score;
  });
  data.strengths.forEach((s) => {
    currentScores[s.competency_id] = s.student_score;
  });

  const readiness = data.readiness_percentage;

  return (
    <div className="min-h-screen bg-background text-foreground font-thai relative overflow-hidden">
      <Navbar />

      {/* Ambient background glows tailored to SUT brand palette */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-0 h-[500px] w-[500px] rounded-full bg-brand-orange/10 dark:bg-brand-orange/15 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[80px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-20">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← {thai ? "กลับไปหน้าผลลัพธ์" : "Back to Results"}
        </button>

        {/* Header Card */}
        <div className="mb-10 rounded-2xl border border-border/60 dark:border-white/5 bg-card/50 dark:bg-card/30 p-8 backdrop-blur-md shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold md:text-4xl">
                <span className="bg-gradient-to-r from-brand-orange to-orange-400 bg-clip-text text-transparent">
                  {data.career.career_name}
                </span>
              </h1>
              <p className="mt-2 text-muted-foreground text-sm font-medium">
                Gap Analysis — {thai ? "การวิเคราะห์ช่องว่างสมรรถนะ" : "Competency Gap Analysis"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-8">
              {/* Animated match % */}
              <div className="text-center sm:text-left">
                <div className="text-5xl font-extrabold text-brand-orange">
                  {animatedMatch.toFixed(1)}
                  <span className="text-2xl font-bold">%</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-semibold">{thai ? "ความเหมาะสม (Match Fit)" : "Match Fit"}</div>
              </div>

              {/* Readiness bar */}
              <div className="w-full sm:w-48">
                <div className="mb-1.5 flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">{thai ? "ความพร้อมหลักสูตร" : "Curriculum Readiness"}</span>
                  <span className="text-emerald-500 font-bold">{readiness}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted-foreground/15">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000 ease-out"
                    style={{ width: `${readiness}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Radar Chart + What-If Simulator */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left - Radar Chart (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col justify-stretch">
            <div className="flex-1">
              <h2 className="mb-4 text-xl font-bold text-foreground flex items-center gap-2">
                <span>📡</span> {thai ? "แผนภูมิใยแมงมุมสมรรถนะ" : "Drilldown Radar"}
              </h2>
              <GapRadarChart radarData={data.radar_data} />
            </div>
          </div>

          {/* Right - What-If Simulator (col-span-2) */}
          <div className="lg:col-span-2 flex flex-col justify-stretch">
            <div className="flex-1">
              <h2 className="mb-4 text-xl font-bold text-foreground flex items-center gap-2">
                <span>🎚️</span> {thai ? "จำลองการปรับระดับทักษะ" : "What-if Simulator"}
              </h2>
              <WhatIfSlider
                gaps={data.gaps}
                currentScores={currentScores}
                allCareers={[]}
                onRankingChange={() => {}}
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* Row 3: Priority Gaps List + Gap Bar Chart */}
        <div className="grid gap-8 lg:grid-cols-5 mt-10">
          {/* Left - Priority Gaps (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col justify-stretch">
            <div className="flex-1">
              <h2 className="mb-4 text-xl font-bold text-foreground flex items-center gap-2">
                <span>⚠️</span> {thai ? "ช่องว่างสมรรถนะสำคัญ" : "Priority Gaps"}
              </h2>
              <PriorityGapsList gaps={data.gaps} />
            </div>
          </div>

          {/* Right - Gap Bar Chart (col-span-2) */}
          <div className="lg:col-span-2 flex flex-col justify-stretch">
            <div className="flex-1">
              <h2 className="mb-4 text-xl font-bold text-foreground flex items-center gap-2">
                <span>📊</span> {thai ? "แผนภูมิเปรียบเทียบช่องว่าง" : "Top Gaps Comparison"}
              </h2>
              <GapBarChart
                gaps={data.gaps}
                maxItems={10}
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* SUT Course Curriculum Mapping & Career Group Matcher */}
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-foreground flex items-center gap-2">
            <span>🎓</span> {thai ? "การวิเคราะห์และแนะนำแผนการเรียน มทส." : "SUT Curriculum Advisory"}
          </h2>
          <CourseMatcher
            careerName={data.career.career_name}
            gaps={data.gaps}
            lang={lang}
          />
        </div>

        {/* Strengths */}
        {data.strengths.length > 0 && (
          <div className="mt-10 rounded-2xl border border-border/60 bg-card/50 dark:bg-card/30 p-6 backdrop-blur-md shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-foreground flex items-center gap-2">
              <span>💪</span> {thai ? "จุดแข็งของคุณ (Your Strengths)" : "Your Strengths"}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {data.strengths.map((s) => (
                <Badge
                  key={s.competency_id}
                  variant="default"
                  className="bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 text-sm font-semibold rounded-xl"
                >
                  {s.competency_id.replace(/_/g, " ")} — {s.student_score}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href={`/marketplace?user=${userId}&career=${careerId}`}
            className="group inline-flex items-center gap-2.5 rounded-xl bg-brand-orange px-10 py-4 text-lg font-bold text-brand-orange-foreground shadow-lg shadow-brand-orange/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand-orange/30"
          >
            {thai ? "ค้นหาคอร์สเรียนเพื่อเรียนล่วงหน้าและปิด Gap" : "Find Courses to Close Gaps"}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
