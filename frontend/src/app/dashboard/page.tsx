"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CareerCard from "@/components/results/CareerCard";
import { CareerRoadmapTimeline } from "@/components/results/CareerRoadmapTimeline";
import Loading from "@/components/ui/Loading";
import { api } from "@/lib/api";
import { MOCK_TOP10 } from "@/lib/mockData";
import type { Top10Response, CareerResult } from "@/types";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("user") || "demo_ton";

  const [data, setData] = useState<Top10Response | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Try localStorage first (offline fallback)
        if (typeof window !== "undefined") {
          const cached = localStorage.getItem("caria_top10");
          if (cached) {
            setData(JSON.parse(cached));
            localStorage.removeItem("caria_top10");
            setLoading(false);
            return;
          }
        }
        const res = await api.getRecommendations(userId);
        setData(res);
      } catch {
        setData(MOCK_TOP10);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);

  const handleCareerClick = (career: CareerResult) => {
    router.push(`/career/${career.career_id}?user=${userId}`);
  };

  if (loading) {
    return <Loading mode="fullpage" />;
  }

  const careers = data?.top10_careers || [];
  const top3 = careers.slice(0, 3);
  const rest = careers.slice(3);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-thai relative overflow-hidden">
      <Navbar />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-20 right-0 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[100px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold md:text-5xl">
            <span className="mr-3">🎯</span>
            <span className="bg-gradient-to-r from-accent to-orange-300 bg-clip-text text-transparent">
              อาชีพที่เหมาะกับคุณ
            </span>
          </h1>
          <p className="mt-3 text-lg text-white/60">
            ผลลัพธ์จากการวิเคราะห์สมรรถนะ 66 มิติ กับ 78 อาชีพดิจิทัล
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/50 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            User: {userId}
          </div>
        </div>

        {/* Top 3 */}
        <div className="mb-6">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-white/90">
            <span className="text-accent">🏆</span> Top 3 อาชีพแนะนำ
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {top3.map((career) => (
              <CareerCard
                key={career.career_id}
                career={career}
                isTopRank={true}
                onClick={() => handleCareerClick(career)}
                className="transition-transform duration-300 hover:scale-[1.02]"
              />
            ))}
          </div>
        </div>

        {/* Remaining */}
        {rest.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white/80">
              อันดับที่ 4 – {3 + rest.length}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((career) => (
                <CareerCard
                  key={career.career_id}
                  career={career}
                  isTopRank={false}
                  onClick={() => handleCareerClick(career)}
                  className="transition-transform duration-300 hover:scale-[1.01]"
                />
              ))}
            </div>
          </div>
        )}

        {/* Personalized Career Roadmap Timeline */}
        {careers.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/5">
            <CareerRoadmapTimeline />
          </div>
        )}

        {/* Empty State */}
        {careers.length === 0 && (
          <div className="mt-20 text-center">
            <div className="text-6xl">🤔</div>
            <p className="mt-4 text-xl text-white/60">ไม่พบข้อมูลอาชีพ</p>
            <button
              onClick={() => router.push("/assessment")}
              className="mt-6 rounded-xl bg-accent px-6 py-3 font-bold text-white transition-all hover:scale-105"
            >
              กลับไปประเมินใหม่
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loading mode="fullpage" />}>
      <DashboardContent />
    </Suspense>
  );
}
