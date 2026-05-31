"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/CourseCard";
import Loading from "@/components/ui/Loading";
import { api } from "@/lib/api";
import { MOCK_GAP_ANALYSIS } from "@/lib/mockData";
import type { GapAnalysisResponse, CourseRec } from "@/types";

interface CourseWithGap {
  course: CourseRec;
  gapScore: number;
  competencyId: string;
}

function MarketplaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("user") || "demo_ton";
  const careerId = searchParams.get("career") || "C01";

  const [data, setData] = useState<GapAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading || !data) {
    return <Loading mode="fullpage" />;
  }

  // Collect all courses from gaps, sorted by gap_score descending
  const coursesWithGap: CourseWithGap[] = [];
  const sortedGaps = [...data.gaps].sort((a, b) => b.gap_score - a.gap_score);

  for (const gap of sortedGaps) {
    for (const course of gap.recommended_courses) {
      coursesWithGap.push({
        course,
        gapScore: gap.gap_score,
        competencyId: gap.competency_id,
      });
    }
  }

  const totalGapAddressed = sortedGaps
    .filter((g) => g.recommended_courses.length > 0)
    .reduce((sum, g) => sum + g.gap_score, 0);

  const totalCourses = coursesWithGap.length;

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-thai relative overflow-hidden">
      <Navbar />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 right-1/4 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-success/15 blur-[100px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-20">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
        >
          ← กลับไปหน้า Gap Analysis
        </button>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold md:text-5xl">
            <span className="mr-3">📚</span>
            <span className="bg-gradient-to-r from-accent to-orange-300 bg-clip-text text-transparent">
              คอร์สเรียนเพื่อปิด Gap
            </span>
          </h1>
          <p className="mt-3 text-lg text-white/60">
            คอร์สแนะนำสำหรับอาชีพ{" "}
            <span className="font-semibold text-accent">
              {data.career.career_name}
            </span>
          </p>
        </div>

        {/* Summary Card */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-gradient-to-br from-primary/20 to-accent/10 p-8 backdrop-blur-md">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                เรียนครบ{" "}
                <span className="text-accent">{totalCourses} คอร์ส</span>{" "}
                ช่วยปิด Gap ได้{" "}
                <span className="text-success">{totalGapAddressed} จุด</span>
              </h2>
              <p className="mt-2 text-white/50">
                คัดเลือกจาก Coursera & Skooldio เฉพาะที่ตรงกับ Gap ของคุณ
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">
                  {totalCourses}
                </div>
                <div className="text-xs text-white/50">คอร์ส</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-success">
                  {totalGapAddressed}
                </div>
                <div className="text-xs text-white/50">Gap points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {coursesWithGap.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coursesWithGap.map((item, idx) => (
              <div
                key={`${item.course.course_id}-${idx}`}
                className="transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="mb-2">
                  <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-white/50">
                    Gap: {item.competencyId.replace(/_/g, " ")}{" "}
                    <span className="font-semibold text-danger">
                      −{item.gapScore}
                    </span>
                  </span>
                </div>
                <CourseCard
                  course={item.course}
                  gapScore={item.gapScore}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="mt-16 text-center">
            <div className="text-7xl">🎉</div>
            <h3 className="mt-6 text-2xl font-bold text-white">
              ไม่มี Gap ที่ต้องปิด!
            </h3>
            <p className="mt-3 text-white/60">
              สมรรถนะของคุณครบถ้วนสำหรับอาชีพนี้แล้ว
            </p>
            <button
              onClick={() => router.push(`/dashboard?user=${userId}`)}
              className="mt-8 rounded-xl bg-accent px-8 py-3 font-bold text-white transition-all hover:scale-105"
            >
              กลับไปดูอาชีพอื่น
            </button>
          </div>
        )}

        {/* Back to career gap analysis */}
        {coursesWithGap.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={() =>
                router.push(`/career/${careerId}?user=${userId}`)
              }
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-white/10 hover:text-white"
            >
              ← กลับไป Gap Analysis
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<Loading mode="fullpage" />}>
      <MarketplaceContent />
    </Suspense>
  );
}
