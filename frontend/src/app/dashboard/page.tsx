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
import { useLanguage } from "@/components/language-provider";
import { useMockUser } from "@/lib/mock-auth";
import { AuthButtons } from "@/components/auth/AuthButtons";
import { CheckCircle2, Lock } from "lucide-react";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("user") || "demo_ton";
  const { lang, t } = useLanguage();
  const thai = lang === "th";
  const user = useMockUser();

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
    <div className="min-h-screen bg-background text-foreground font-thai relative overflow-hidden">
      <Navbar />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-orange/15 blur-[130px]" />
        <div className="absolute bottom-20 right-0 h-[400px] w-[400px] rounded-full bg-[#2563EB]/10 blur-[110px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold md:text-5xl">
            <span className="mr-3">🎯</span>
            <span className="bg-gradient-to-r from-brand-orange to-orange-400 bg-clip-text text-transparent">
              {thai ? "อาชีพที่เหมาะกับคุณ (Recommended Careers)" : "Recommended Careers"}
            </span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {thai 
              ? "ผลลัพธ์จากการวิเคราะห์สมรรถนะ 66 มิติ กับ 78 อาชีพดิจิทัล" 
              : "Results of mapping 66 competency dimensions against 78 digital careers"}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            User: {userId}
          </div>
        </div>

        {/* Top 3 */}
        <div className="mb-6">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground">
            <span className="text-brand-orange">🏆</span> {thai ? "Top 3 อาชีพแนะนำ (Top 3 Recommended)" : "Top 3 Recommended Careers"}
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

        {/* Login hook — appears once Top 3 are revealed (guest → save & unlock) */}
        {careers.length > 0 && (
          <div className="mt-8">
            {user ? (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-5 py-4">
                <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
                <p className="text-sm text-foreground">
                  {thai
                    ? `บันทึกผลลัพธ์ไว้ในบัญชีของ ${user.name} เรียบร้อยแล้ว`
                    : `Results saved to ${user.name}'s account`}
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-brand-orange/30 bg-gradient-to-br from-brand-orange/10 to-[#2563EB]/5 p-6 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="flex-1">
                    <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-[11px] font-bold text-brand-orange">
                      <Lock className="size-3" />
                      {thai ? "ปลดล็อกขั้นต่อไป" : "Unlock next step"}
                    </div>
                    <h3 className="text-xl font-bold text-foreground md:text-2xl">
                      {thai
                        ? "เข้าสู่ระบบเพื่อดูวิชาเรียนที่แนะนำและบันทึกผลลัพธ์ของคุณ"
                        : "Log in to see recommended courses & save your results"}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                      {thai
                        ? "ผลการประเมินถูกเก็บไว้ชั่วคราวบนเครื่องนี้ — เข้าสู่ระบบด้วย Google หรือ Facebook เพื่อบันทึกถาวรและปลดล็อกแผนการเรียนรายวิชา มทส."
                        : "Your results are stored locally for now — log in with Google or Facebook to save them and unlock the SUT course roadmap."}
                    </p>
                  </div>
                  <div className="w-full shrink-0 md:w-72">
                    <AuthButtons />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Remaining */}
        {rest.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
              {thai ? `อันดับที่ 4 – ${3 + rest.length} (Ranks 4 – ${3 + rest.length})` : `Ranks 4 – ${3 + rest.length}`}
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
          <div className="mt-16 pt-10 border-t border-border">
            <CareerRoadmapTimeline />
          </div>
        )}

        {/* Empty State */}
        {careers.length === 0 && (
          <div className="mt-20 text-center">
            <div className="text-6xl">🤔</div>
            <p className="mt-4 text-xl text-muted-foreground">{thai ? "ไม่พบข้อมูลอาชีพ" : "No career matches found"}</p>
            <button
              onClick={() => router.push("/assessment")}
              className="mt-6 rounded-xl bg-brand-orange px-6 py-3 font-bold text-brand-orange-foreground transition-all hover:scale-105"
            >
              {thai ? "กลับไปประเมินใหม่" : "Retake Assessment"}
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
