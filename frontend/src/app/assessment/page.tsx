"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DropZone } from "@/components/upload/DropZone";
import { AttitudeSliders } from "@/components/upload/AttitudeSliders";
import { OnboardingCard } from "@/components/assessment/OnboardingCard";
import { GamifiedQuiz } from "@/components/assessment/GamifiedQuiz";
import { api } from "@/lib/api";
import { DEMO_PERSONAS, MOCK_TOP10 } from "@/lib/mockData";
import { ShieldCheck, FileText, CheckCircle2, UserCheck, HelpCircle } from "lucide-react";

const DEFAULT_ATTITUDES: Record<string, number> = {
  A01_Artistic: 50,
  A02_Conventional: 50,
  A03_Enterprising: 50,
  A04_Investigative: 50,
  A05_Realistic: 50,
  A06_Social: 50,
};

export default function AssessmentPage() {
  const router = useRouter();
  
  // Quiz states
  const [step, setStep] = useState<"onboarding" | "method_select" | "quiz_81" | "hybrid_upload">("onboarding");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [attitudeScores, setAttitudeScores] = useState<Record<string, number>>(DEFAULT_ATTITUDES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [lang, setLang] = useState<"th" | "en">("th");

  const handlePersonaClick = (userId: string) => {
    setSelectedPersona((prev) => (prev === userId ? null : userId));
  };

  const loadDemoData = (type: 'dev' | 'design') => {
    const mockFile = new File(["dummy content"], `resume_${type}_demo.pdf`, { type: 'application/pdf' });
    setSelectedFile(mockFile);
    if (type === 'dev') {
      setAttitudeScores({
        A01_Artistic: 30, A02_Conventional: 60, A03_Enterprising: 40,
        A04_Investigative: 85, A05_Realistic: 70, A06_Social: 45
      });
      setSelectedPersona('U_ton');
    } else {
      setAttitudeScores({
        A01_Artistic: 90, A02_Conventional: 30, A03_Enterprising: 50,
        A04_Investigative: 60, A05_Realistic: 40, A06_Social: 75
      });
      setSelectedPersona('U_mai');
    }
    // Set view to hybrid upload where the data fills in
    setStep("hybrid_upload");
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
      });
      
      // Store in localStorage to pass values
      if (typeof window !== "undefined") {
        const customResults = {
          ...MOCK_TOP10,
          user_id: res.user_id,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem("caria_top10", JSON.stringify(customResults));
        localStorage.setItem("user_custom_scores", JSON.stringify(compiledScores));
      }
      router.push(`/dashboard?user=${res.user_id}`);
    } catch {
      const fallbackUserId = `user_81_demo`;
      if (typeof window !== "undefined") {
        localStorage.setItem("caria_top10", JSON.stringify(MOCK_TOP10));
        localStorage.setItem("user_custom_scores", JSON.stringify(compiledScores));
      }
      router.push(`/dashboard?user=${fallbackUserId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit from the Hybrid / Resume upload flow
  const handleHybridSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (selectedPersona) {
        await api.submitAssessment({
          user_id: selectedPersona,
          program: DEMO_PERSONAS.find((p) => p.user_id === selectedPersona)?.program || "",
          scores: {},
          input_method: "demo_persona",
        });
        router.push(`/dashboard?user=${selectedPersona}`);
      } else {
        const res = await api.submitAssessment({
          user_id: `user_${Date.now()}`,
          program: "Digital Technology",
          scores: attitudeScores,
          input_method: selectedFile ? "hybrid" : "attitude_only",
        });
        router.push(`/dashboard?user=${res.user_id}`);
      }
    } catch {
      const fallbackUserId = selectedPersona || "demo_ton";
      if (typeof window !== "undefined") {
        localStorage.setItem("caria_top10", JSON.stringify(MOCK_TOP10));
      }
      router.push(`/dashboard?user=${fallbackUserId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-thai relative overflow-hidden flex flex-col">
      <Navbar />

      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[100px]" />
      </div>

      <main className="flex-1 relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-20 flex flex-col justify-center">
        
        {/* Onboarding Screen */}
        {step === "onboarding" && (
          <OnboardingCard
            onStart={() => setStep("method_select")}
            lang={lang}
          />
        )}

        {/* Method Select Screen */}
        {step === "method_select" && (
          <div className="max-w-4xl mx-auto w-full animate-fade-in">
            <h2 className="text-3xl font-extrabold text-center mb-2">
              <span className="bg-gradient-to-r from-accent to-orange-300 bg-clip-text text-transparent">
                เลือกวิธีการประเมินสมรรถนะ
              </span>
            </h2>
            <p className="text-center text-sm text-white/50 mb-10">
              เลือกระดับความละเอียดในการประเมินเพื่อรับผลการแนะนำอาชีพและปิดช่องว่างสมรรถนะ
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Method A: 81 Questions */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-between hover:border-brand-orange/40 hover:bg-white/[0.08] transition-all group">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-brand-orange/15 text-brand-orange flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">ประเมินแบบละเอียด 81 ข้อ</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    ประเมินเชิงลึกทุกมิติ (ทักษะ, ความรู้, ทัศนคติ) ใช้เวลาประมาณ 5 นาที เพื่อผลการวิเคราะห์ที่มีความแม่นยำสูงที่สุด (ความแม่นยำ 83% ตามงานวิจัย)
                  </p>
                  <ul className="mt-4 space-y-2">
                    {["ประเมินสมรรถนะครบ 66 ด้าน", "ระบบตอบด้วยปุ่มกด 1-2-3 สะดวกสบาย", "ไม่จำเป็นต้องใช้อัปโหลดเรซูเม"].map((t, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-medium text-white/80">
                        <CheckCircle2 size={12} className="text-brand-orange" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setStep("quiz_81")}
                  className="mt-8 w-full py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-light font-bold text-sm text-white transition-all hover:scale-[1.02]"
                >
                  เริ่มทำแบบประเมิน 81 ข้อ →
                </button>
              </div>

              {/* Method B: Hybrid Upload */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/40 hover:bg-white/[0.08] transition-all group">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <FileText size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">อัปโหลด Resume + ประเมินสั้น</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    ดึงประวัติการทำงาน/ทักษะจากไฟล์เรซูเม PDF อัตโนมัติ ร่วมกับการตอบคำถามเจตคติสั้นๆ 6 ข้อเพื่อวิเคราะห์อาชีพ
                  </p>
                  <ul className="mt-4 space-y-2">
                    {["ประเมินความพร้อมแบบไฮบริดด่วน", "ดึงคำสำคัญทักษะและผลการเรียนทางอ้อม", "โหลดโปรไฟล์จำลอง (Demo Personas) ได้"].map((t, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-medium text-white/80">
                        <CheckCircle2 size={12} className="text-blue-400" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setStep("hybrid_upload")}
                  className="mt-8 w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-sm text-white transition-all hover:scale-[1.02]"
                >
                  อัปโหลดเรซูเม / ใช้เดโม →
                </button>
              </div>

            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setStep("onboarding")}
                className="text-xs text-white/40 hover:text-white transition-colors"
              >
                ย้อนกลับไปอ่านคู่มือก่อนหน้า
              </button>
            </div>
          </div>
        )}

        {/* 81 Questions Quiz Screen */}
        {step === "quiz_81" && (
          <div className="w-full animate-slide-up">
            <GamifiedQuiz
              onComplete={handleQuizComplete}
              onBack={() => setStep("method_select")}
              lang={lang}
            />
          </div>
        )}

        {/* Hybrid Upload Screen */}
        {step === "hybrid_upload" && (
          <div className="w-full animate-fade-in">
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
              <div>
                <button
                  onClick={() => setStep("method_select")}
                  className="mb-2 text-xs text-blue-400 hover:underline flex items-center gap-1"
                >
                  ← เปลี่ยนวิธีการประเมิน
                </button>
                <h2 className="text-3xl font-extrabold">
                  <span className="bg-gradient-to-r from-accent to-orange-300 bg-clip-text text-transparent">
                    ระบบไฮบริด (Resume + แบบสั้น)
                  </span>
                </h2>
                <p className="mt-2 text-xs text-white/60">
                  อัปโหลดเรซูเมเพื่อสกัดสมรรถนะ ร่วมกับสไลเดอร์เจตคติ 6 ด้าน
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                <button 
                  onClick={() => loadDemoData('dev')}
                  className="text-[10px] font-bold px-3 py-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/40 transition-colors"
                >
                  ⚡ ต้น (สาย Dev)
                </button>
                <button 
                  onClick={() => loadDemoData('design')}
                  className="text-[10px] font-bold px-3 py-1.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-500/40 transition-colors"
                >
                  ⚡ ใหม่ (สาย Design)
                </button>
              </div>
            </div>

            {/* Grid Layout */}
            <div className="grid gap-6 lg:grid-cols-2">
              
              {/* Left Column: Upload Resume */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/30 text-lg">
                    📄
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Upload Resume</h3>
                    <p className="text-[10px] text-white/50">รองรับ PDF, DOCX ไม่เกิน 5MB</p>
                  </div>
                </div>
                
                <DropZone
                  onFileSelect={(file: File | null) => setSelectedFile(file)}
                  className="min-h-[220px]"
                />
                
                {selectedFile && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-success/10 px-3 py-1.5 text-xs text-success border border-success/20">
                    <ShieldCheck size={14} />
                    <span>อัปโหลดสำเร็จ: {selectedFile.name}</span>
                  </div>
                )}
              </div>

              {/* Right Column: Attitude Sliders */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/30 text-lg">
                    🎚️
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">ประเมินเจตคติสะท้อนตัวตน</h3>
                    <p className="text-[10px] text-white/50">ลากปรับสไลเดอร์ตามทัศนคติ RIASEC</p>
                  </div>
                </div>

                <AttitudeSliders
                  values={attitudeScores}
                  onChange={(scores: Record<string, number>) => setAttitudeScores(scores)}
                  className=""
                />
              </div>

            </div>

            {/* Demo Personas Indicator */}
            {selectedPersona && (
              <div className="mt-6 p-4 rounded-xl border border-accent/20 bg-accent/5 flex items-center gap-3 max-w-md mx-auto">
                <div className="h-8 w-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-bold">
                  <UserCheck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold">เปิดใช้งานข้อมูลตัวอย่างสำเร็จรูป</h4>
                  <p className="text-[10px] text-white/60">
                    โปรไฟล์: {DEMO_PERSONAS.find(p => p.user_id === selectedPersona)?.name} ({DEMO_PERSONAS.find(p => p.user_id === selectedPersona)?.description})
                  </p>
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleHybridSubmit}
                disabled={
                  isSubmitting ||
                  (!selectedFile && !selectedPersona && Object.values(attitudeScores).every((v) => v === 50))
                }
                className="group py-3 px-8 rounded-xl bg-accent hover:bg-brand-orange-light font-bold text-sm text-white transition-all shadow-lg hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    กำลังประมวลผลวิเคราะห์...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    เริ่มวิเคราะห์ผลลัพธ์อาชีพ →
                  </span>
                )}
              </button>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
