"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/components/language-provider";
import { motion, AnimatePresence } from "motion/react";
import { OnboardingCard } from "@/components/assessment/OnboardingCard";
import { DreamCareerSelectCard } from "@/components/assessment/DreamCareerSelectCard";
import { GamifiedQuiz } from "@/components/assessment/GamifiedQuiz";
import { api } from "@/lib/api";
import { MOCK_TOP10 } from "@/lib/mockData";
import mockCareers from "@/lib/mock_careers.json";

export default function AssessmentPage() {
  const router = useRouter();
  
  // Quiz states
  const [step, setStep] = useState<"dream_career" | "onboarding" | "quiz_81">("dream_career");
  const [dreamCareerId, setDreamCareerId] = useState<string>("");
  const [dreamCareerGroup, setDreamCareerGroup] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { lang, t } = useLanguage();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const careerId = params.get("career");
      if (careerId) {
        const found = (mockCareers as any[]).find((c) => c.career_id === careerId);
        if (found) {
          setDreamCareerId(found.career_id);
          setDreamCareerGroup(found.career_group);
          setStep("onboarding");
        }
      }
    }
  }, []);

  // Prototype convenience: jump straight to the dashboard with mock results
  // so testers don't have to complete the assessment every time.
  const handleSkipDemo = () => {
    if (typeof window !== "undefined") {
      const skippedResults = {
        ...MOCK_TOP10,
        dream_career_id: "DT08", // Software Developer
        dream_career_group: "Enterprise Software",
      };
      localStorage.setItem("caria_top10", JSON.stringify(skippedResults));
      localStorage.setItem("caria_dream_career_id", "DT08");
      localStorage.setItem("caria_dream_career_group", "Enterprise Software");
    }
    router.push("/dashboard?user=demo_ton");
  };

  // Submit from the 81-question quiz
  const handleQuizComplete = async (compiledScores: Record<string, number>) => {
    setIsSubmitting(true);
    try {
      const res = await api.submitAssessment({
        user_id: `user_81_${Date.now()}`,
        program: "Digital Technology",
        scores: compiledScores,
        input_method: "quiz_81",
        dream_career_id: dreamCareerId || undefined,
        dream_career_group: dreamCareerGroup || undefined,
      });
      
      // Store in localStorage to pass values
      if (typeof window !== "undefined") {
        const customResults = {
          ...res,
          dream_career_id: res.dream_career_id || dreamCareerId || undefined,
          dream_career_group: res.dream_career_group || dreamCareerGroup || undefined,
          user_id: res.user_id,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem("caria_top10", JSON.stringify(customResults));
        localStorage.setItem("caria_dream_career_id", res.dream_career_id || dreamCareerId || "");
        localStorage.setItem("caria_dream_career_group", res.dream_career_group || dreamCareerGroup || "");
        localStorage.setItem("user_custom_scores", JSON.stringify(compiledScores));
      }
      router.push(`/dashboard?user=${res.user_id}`);
    } catch {
      const fallbackUserId = `user_81_demo`;
      if (typeof window !== "undefined") {
        const customResults = {
          ...MOCK_TOP10,
          user_id: fallbackUserId,
          timestamp: new Date().toISOString(),
          dream_career_id: dreamCareerId || undefined,
          dream_career_group: dreamCareerGroup || undefined,
        };
        localStorage.setItem("caria_top10", JSON.stringify(customResults));
        localStorage.setItem("caria_dream_career_id", dreamCareerId || "");
        localStorage.setItem("caria_dream_career_group", dreamCareerGroup || "");
        localStorage.setItem("user_custom_scores", JSON.stringify(compiledScores));
      }
      router.push(`/dashboard?user=${fallbackUserId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
      <SiteHeader />

      {/* Prototype quick-skip to dashboard (testing convenience) */}
      <button
        onClick={handleSkipDemo}
        className="fixed top-20 right-4 z-40 rounded-full border border-border bg-card/90 px-4 py-2 text-xs font-bold text-muted-foreground shadow-lg backdrop-blur transition-colors hover:border-brand-orange/50 hover:text-brand-orange"
      >
        {lang === "th" ? "ข้ามไปดู Dashboard (เดโม) →" : "Skip to Dashboard (demo) →"}
      </button>

      {/* Dark-mode cinematic base */}
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{
          background: "radial-gradient(ellipse 95% 85% at 72% 45%, #0A1422 0%, #050A14 45%, #030712 100%)",
        }}
      />
      {/* Light-mode airy base */}
      <div
        className="absolute inset-0 pointer-events-none dark:hidden"
        style={{
          background: "radial-gradient(ellipse 95% 85% at 72% 45%, #ffffff 0%, #eef3fb 55%, #e6edf8 100%)",
        }}
      />
      {/* Cool glow behind the nexus (right) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 60% at 74% 48%, rgba(45,156,255,0.08) 0%, transparent 65%)",
        }}
      />
      {/* Warm glow behind the headline (left) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 45% 55% at 18% 42%, rgba(243,146,0,0.08) 0%, transparent 68%)",
        }}
      />

      <main className="flex-1 relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-20 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* Step 2: Dream Career Selection */}
          {step === "dream_career" && (
            <motion.div
              key="dream_career"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="w-full"
            >
              <DreamCareerSelectCard
                onContinue={(id, group) => {
                  setDreamCareerId(id);
                  setDreamCareerGroup(group);
                  setStep("onboarding");
                }}
                lang={lang}
              />
            </motion.div>
          )}

          {/* Step 3: Onboarding & Consent Screen */}
          {step === "onboarding" && (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="w-full"
            >
              <OnboardingCard
                onStart={() => setStep("quiz_81")}
                lang={lang}
              />
            </motion.div>
          )}

          {/* Step 4: 10 Questions Quiz Screen */}
          {step === "quiz_81" && (
            <motion.div
              key="quiz_81"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="w-full"
            >
              <GamifiedQuiz
                onComplete={handleQuizComplete}
                onBack={() => setStep("onboarding")}
                onSkip={handleSkipDemo}
                lang={lang}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <SiteFooter />
    </div>
  );
}
