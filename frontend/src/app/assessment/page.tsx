"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DropZone } from "@/components/upload/DropZone";
import { AttitudeSliders } from "@/components/upload/AttitudeSliders";
import { api } from "@/lib/api";
import { DEMO_PERSONAS, MOCK_TOP10 } from "@/lib/mockData";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [attitudeScores, setAttitudeScores] =
    useState<Record<string, number>>(DEFAULT_ATTITUDES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

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
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (selectedPersona) {
        await api.submitAssessment({
          user_id: selectedPersona,
          program:
            DEMO_PERSONAS.find((p) => p.user_id === selectedPersona)
              ?.program || "",
          scores: {},
          input_method: "demo_persona",
        });
        router.push(`/dashboard?user=${selectedPersona}`);
      } else {
        const res = await api.submitAssessment({
          user_id: `user_${Date.now()}`,
          program: "วิศวกรรมคอมพิวเตอร์",
          scores: attitudeScores,
          input_method: selectedFile ? "hybrid" : "attitude_only",
        });
        router.push(`/dashboard?user=${res.user_id}`);
      }
    } catch {
      // API failed — fallback to mock
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
    <div className="min-h-screen bg-[#0a0e1a] text-white font-thai relative overflow-hidden">
      <Navbar />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[100px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">
              <span className="bg-gradient-to-r from-accent to-orange-300 bg-clip-text text-transparent">
                ประเมินสมรรถนะ
              </span>
            </h1>
            <p className="mt-3 text-lg text-white/60">
              อัปโหลด Resume หรือ ประเมินด้วยตัวเอง — หรือทั้งสองอย่าง
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => loadDemoData('dev')}
              className="text-xs font-bold px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/40 transition-colors flex items-center justify-center gap-1"
            >
              ⚡ โหลดข้อมูลจำลอง: ต้น (สาย Dev)
            </button>
            <button 
              onClick={() => loadDemoData('design')}
              className="text-xs font-bold px-4 py-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-500/40 transition-colors flex items-center justify-center gap-1"
            >
              ⚡ โหลดข้อมูลจำลอง: ใหม่ (สาย Design)
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Upload Resume */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/30 text-xl">
                📄
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Upload Resume</h2>
                <p className="text-sm text-white/50">
                  รองรับ PDF, DOCX (ไม่เกิน 5MB)
                </p>
              </div>
            </div>
            <DropZone
              onFileSelect={(file: File | null) => setSelectedFile(file)}
              className="min-h-[260px]"
            />
            {selectedFile && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-success/10 px-4 py-2 text-sm text-success">
                <span>✓</span>
                <span>{selectedFile.name}</span>
              </div>
            )}
          </div>

          {/* Right: Attitude Sliders */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/30 text-xl">
                🎚️
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  แบบประเมินเจตคติ
                </h2>
                <p className="text-sm text-white/50">
                  ประเมินตนเอง 6 ด้าน (RIASEC)
                </p>
              </div>
            </div>
            <AttitudeSliders
              values={attitudeScores}
              onChange={(scores: Record<string, number>) =>
                setAttitudeScores(scores)
              }
              className=""
            />
          </div>
        </div>

        {/* Demo Personas */}
        <div className="mt-10">
          <h3 className="mb-4 text-center text-lg font-semibold text-white/70">
            หรือเลือก Demo Persona เพื่อทดลองใช้งาน
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {DEMO_PERSONAS.map((persona) => (
              <button
                key={persona.user_id}
                onClick={() => handlePersonaClick(persona.user_id)}
                className={`group rounded-xl border px-6 py-4 text-left transition-all duration-300 ${
                  selectedPersona === persona.user_id
                    ? "border-accent bg-accent/10 shadow-lg shadow-accent/20"
                    : "border-white/10 bg-white/5 hover:border-accent/30 hover:bg-white/[0.08]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
                      selectedPersona === persona.user_id
                        ? "bg-accent text-white"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {persona.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-white">{persona.name}</div>
                    <div className="text-xs text-white/50">
                      {persona.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              (!selectedFile &&
                !selectedPersona &&
                Object.values(attitudeScores).every((v) => v === 50))
            }
            className="group inline-flex items-center gap-3 rounded-xl bg-accent px-10 py-4 text-lg font-bold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                กำลังวิเคราะห์...
              </>
            ) : (
              <>
                วิเคราะห์สมรรถนะ
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
