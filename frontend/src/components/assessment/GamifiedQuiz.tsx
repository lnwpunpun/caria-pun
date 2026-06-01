"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSESSMENT_QUESTIONS, QuestionItem } from "@/lib/questions";
import { ArrowLeft, CheckSquare, Sparkles, Smile, BookOpen, BrainCircuit } from "lucide-react";

interface GamifiedQuizProps {
  onComplete: (scores: Record<string, number>) => void;
  onBack: () => void;
  lang: "th" | "en";
}

// Map the 3 option levels to numeric scores out of 100
const SCORE_MAP = {
  basic: 35,
  intermediate: 70,
  advanced: 95
};

export function GamifiedQuiz({ onComplete, onBack, lang }: GamifiedQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, keyof typeof SCORE_MAP>>({});
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const thai = lang === "th";

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentQuestion = ASSESSMENT_QUESTIONS[currentIndex];

  // Listen to keyboard hotkeys (1, 2, 3)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "1") handleAnswer("basic");
      else if (e.key === "2") handleAnswer("intermediate");
      else if (e.key === "3") handleAnswer("advanced");
      else if (e.key === "Backspace" || e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const handleAnswer = (level: keyof typeof SCORE_MAP) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: level }));
    setSlideDirection("left");

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Last question completed! Let's aggregate scores
      const finalAnswers = { ...answers, [currentQuestion.id]: level };
      const compiled = compileScores(finalAnswers);
      onComplete(compiled);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSlideDirection("right");
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Compile individual question answers (1-81) into competency dimensions (S01, A01, etc.)
  const compileScores = (ans: Record<number, keyof typeof SCORE_MAP>): Record<string, number> => {
    const totals: Record<string, number[]> = {};
    
    ASSESSMENT_QUESTIONS.forEach((q) => {
      const level = ans[q.id] || "intermediate"; // default fallback
      const score = SCORE_MAP[level];
      if (!totals[q.competencyId]) {
        totals[q.competencyId] = [];
      }
      totals[q.competencyId].push(score);
    });

    const result: Record<string, number> = {};
    Object.keys(totals).forEach((compKey) => {
      const arr = totals[compKey];
      const sum = arr.reduce((a, b) => a + b, 0);
      result[compKey] = Math.round(sum / arr.length);
    });

    return result;
  };

  // Calculate percentage of completion
  const progressPercent = Math.round((currentIndex / totalQuestions) * 100);

  // Icon depending on the question domain
  const getDomainIcon = (domain: QuestionItem["domain"]) => {
    switch (domain) {
      case "skill": return <BrainCircuit size={20} className="text-brand-orange" />;
      case "attitude": return <Smile size={20} className="text-purple-400" />;
      case "knowledge": return <BookOpen size={20} className="text-blue-400" />;
    }
  };

  const getDomainBadge = (domain: QuestionItem["domain"]) => {
    switch (domain) {
      case "skill": return thai ? "ทักษะ (Skill)" : "Skill";
      case "attitude": return thai ? "เจตคติ (Attitude)" : "Attitude";
      case "knowledge": return thai ? "ความรู้ (Knowledge)" : "Knowledge";
    }
  };

  return (
    <div className="max-w-2xl mx-auto rounded-3xl border border-slate-200 bg-white/70 p-6 md:p-8 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0f1d]/75 shadow-2xl flex flex-col min-h-[480px]">
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={currentIndex === 0 ? onBack : handlePrev}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>{thai ? "ย้อนกลับ" : "Back"}</span>
        </button>
        <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
          {thai ? "ข้อที่" : "Question"} <span className="text-brand-orange text-sm font-extrabold">{currentIndex + 1}</span> / {totalQuestions}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
          <motion.div
            layoutId="quizProgressBar"
            className="h-full bg-gradient-to-r from-brand-orange to-amber-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-[10px] font-bold text-slate-400">
          <span>{progressPercent}% {thai ? "เสร็จสิ้น" : "Completed"}</span>
          <span>{totalQuestions - currentIndex} {thai ? "ข้อที่เหลือ" : "remaining"}</span>
        </div>
      </div>

      {/* Question Card Container */}
      <div className="flex-1 flex flex-col justify-center relative overflow-hidden min-h-[160px]">
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={currentQuestion.id}
            custom={slideDirection}
            initial={{ opacity: 0, x: slideDirection === "left" ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slideDirection === "left" ? -100 : 100 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="text-center py-4"
          >
            {/* Domain Info */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 dark:bg-white/5 text-[10px] font-bold tracking-wider uppercase text-slate-500 dark:text-white/50 mb-4">
              {getDomainIcon(currentQuestion.domain)}
              <span>{getDomainBadge(currentQuestion.domain)}</span>
            </div>

            {/* Question Statement */}
            <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white leading-relaxed max-w-lg mx-auto">
              {thai ? currentQuestion.textTh : currentQuestion.textEn}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3-Level Interactive Button Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-8">
        
        {/* Option 1: Basic */}
        <button
          onClick={() => handleAnswer("basic")}
          className="group flex flex-col items-center text-center p-4 rounded-2xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 active:scale-98 transition-all pointer-events-auto"
        >
          <div className="h-8 w-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center font-bold text-sm mb-2 group-hover:scale-105 transition-transform">
            1
          </div>
          <span className="text-xs font-bold text-red-600 dark:text-red-400">
            {thai ? "ยังไม่มีพื้นฐาน / ไม่ชำนาญ" : "Basic / No basis"}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 dark:text-slate-500">
            {thai ? "คะแนนเฉลี่ย 35%" : "Score ~35%"}
          </span>
        </button>

        {/* Option 2: Intermediate */}
        <button
          onClick={() => handleAnswer("intermediate")}
          className="group flex flex-col items-center text-center p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 active:scale-98 transition-all pointer-events-auto"
        >
          <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-sm mb-2 group-hover:scale-105 transition-transform">
            2
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
            {thai ? "เข้าใจ / ใช้งานได้ปกติ" : "Intermediate / Good"}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 dark:text-slate-500">
            {thai ? "คะแนนเฉลี่ย 70%" : "Score ~70%"}
          </span>
        </button>

        {/* Option 3: Advanced */}
        <button
          onClick={() => handleAnswer("advanced")}
          className="group flex flex-col items-center text-center p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 active:scale-98 transition-all pointer-events-auto"
        >
          <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm mb-2 group-hover:scale-105 transition-transform">
            3
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {thai ? "เชี่ยวชาญ / แก้โจทย์ยากได้" : "Advanced / Expert"}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 dark:text-slate-500">
            {thai ? "คะแนนเฉลี่ย 95%" : "Score ~95%"}
          </span>
        </button>

      </div>

      {/* Keyboard Hint */}
      <div className="text-center mt-6 text-[10px] font-medium text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
        <span>💡 {thai ? "แนะนำการตอบด่วนด้วยปุ่มตัวเลข" : "Quick Keyboard Tip:"}</span>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border dark:bg-white/5 dark:border-white/10">1</kbd>,
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border dark:bg-white/5 dark:border-white/10">2</kbd>,
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border dark:bg-white/5 dark:border-white/10">3</kbd>
        <span>{thai ? "บนแป้นพิมพ์เพื่อประเมินความเร็วสูง" : "on your keyboard to speed-run"}</span>
      </div>

    </div>
  );
}
