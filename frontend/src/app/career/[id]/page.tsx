"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GapAnalysisSection from "@/components/GapAnalysisSection";
import WhatIfSlider from "@/components/WhatIfSlider";
import { GapBarChart } from "@/components/gap/GapBarChart";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/ui/Loading";
import { api } from "@/lib/api";
import { MOCK_GAP_ANALYSIS } from "@/lib/mockData";
import type { GapAnalysisResponse, CompetencyScores } from "@/types";

export default function CareerGapPage() {
  const router = useRouter();
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
    <div className="min-h-screen bg-[#0a0e1a] text-white font-thai relative overflow-hidden">
      <Navbar />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-0 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-success/10 blur-[80px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-20">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
        >
          ← กลับไปหน้าผลลัพธ์
        </button>

        {/* Header Card */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">
                <span className="bg-gradient-to-r from-accent to-orange-300 bg-clip-text text-transparent">
                  {data.career.career_name}
                </span>
              </h1>
              <p className="mt-2 text-white/50">
                Gap Analysis — การวิเคราะห์ช่องว่างสมรรถนะ
              </p>
            </div>

            <div className="flex items-center gap-8">
              {/* Animated match % */}
              <div className="text-center">
                <div className="text-5xl font-bold text-accent">
                  {animatedMatch.toFixed(1)}
                  <span className="text-2xl">%</span>
                </div>
                <div className="text-sm text-white/50">ความเหมาะสม</div>
              </div>

              {/* Readiness bar */}
              <div className="w-48">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-white/60">ความพร้อม</span>
                  <span className="font-bold text-success">{readiness}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-success to-emerald-400 transition-all duration-1000 ease-out"
                    style={{ width: `${readiness}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main 2-col: Radar + What-if */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left — Radar (wider) */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <h2 className="mb-4 text-xl font-bold text-white">
                📡 Drilldown Radar
              </h2>
              <GapAnalysisSection />
            </div>
          </div>

          {/* Right — What-if Slider */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <h2 className="mb-4 text-xl font-bold text-white">
                🎚️ What-if Simulator
              </h2>
              <p className="mb-4 text-sm text-white/50">
                ลองปรับคะแนนเพื่อดูว่าหากพัฒนาสมรรถนะนี้ อันดับจะเปลี่ยนอย่างไร
              </p>
              <WhatIfSlider
                gaps={data.gaps}
                currentScores={currentScores}
                allCareers={[]}
                onRankingChange={() => {}}
                className=""
              />
            </div>
          </div>
        </div>

        {/* Gap Bar Chart */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <h2 className="mb-4 text-xl font-bold text-white">
            📊 Gap สมรรถนะ (เรียงจากมากไปน้อย)
          </h2>
          <GapBarChart
            gaps={data.gaps}
            maxItems={10}
            className="min-h-[300px]"
          />
        </div>

        {/* Strengths */}
        {data.strengths.length > 0 && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h2 className="mb-4 text-xl font-bold text-white">
              💪 จุดแข็งของคุณ
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.strengths.map((s) => (
                <Badge
                  key={s.competency_id}
                  variant="default"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm"
                >
                  {s.competency_id.replace(/_/g, " ")} — {s.student_score}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href={`/marketplace?user=${userId}&career=${careerId}`}
            className="group inline-flex items-center gap-3 rounded-xl bg-accent px-10 py-4 text-lg font-bold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/40"
          >
            ค้นหาคอร์สเรียนเพื่อปิด Gap
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
