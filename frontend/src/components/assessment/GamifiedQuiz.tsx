"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ASSESSMENT_QUESTIONS, QuestionItem } from "@/lib/questions";
import { ArrowLeft, ArrowRight, BrainCircuit, Smile, BookOpen } from "lucide-react";

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

const QUESTIONS_PER_PAGE = 5;

export function GamifiedQuiz({ onComplete, onBack, lang }: GamifiedQuizProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<Record<number, keyof typeof SCORE_MAP>>({});
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const thai = lang === "th";

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);

  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const currentQuestions = ASSESSMENT_QUESTIONS.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  const handleAnswer = (questionId: number, level: keyof typeof SCORE_MAP) => {
    setAnswers((prev) => ({ ...prev, [questionId]: level }));
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setSlideDirection("left");
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete(compileScores(answers));
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setSlideDirection("right");
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  // Compile individual question answers into competency dimensions (S01, A01, etc.)
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

  // Prototype convenience: skip the remaining questions. Unanswered items default to "intermediate".
  const handleSkip = () => {
    onComplete(compileScores(answers));
  };

  const allAnsweredOnPage = currentQuestions.every(q => answers[q.id] !== undefined);
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const getDomainIcon = (domain: QuestionItem["domain"]) => {
    switch (domain) {
      case "skill": return <BrainCircuit size={16} className="text-brand-orange" />;
      case "attitude": return <Smile size={16} className="text-purple-400" />;
      case "knowledge": return <BookOpen size={16} className="text-blue-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col min-h-[60vh] w-full">
      
      {/* Top Header with Prototype Skip */}
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={handleSkip}
          title={thai ? "ข้ามไปดูผลลัพธ์เลย (เดโม)" : "Skip to results (demo)"}
          className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:border-brand-orange/50 hover:text-brand-orange dark:border-white/10 dark:text-slate-400"
        >
          {thai ? "ข้ามไปดูผล ⏩" : "Skip to results ⏩"}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 w-full">
        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-white/5 overflow-hidden">
          <motion.div
            layoutId="quizProgressBar"
            className="h-full bg-gradient-to-r from-brand-orange to-amber-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs font-bold text-slate-500">
          <span>{progressPercent}% {thai ? "เสร็จสิ้น" : "Completed"}</span>
          <span>{totalQuestions - answeredCount} {thai ? "ข้อที่เหลือ" : "remaining"}</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col relative w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={currentPage}
            custom={slideDirection}
            initial={{ opacity: 0, x: slideDirection === "left" ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slideDirection === "left" ? -60 : 60 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-6 w-full"
          >
            {currentQuestions.map((q) => (
              <div key={q.id} className="rounded-3xl border border-slate-200 bg-white/70 p-6 md:p-8 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0f1d]/75 shadow-lg flex flex-col text-center w-full">
                
                {/* Domain Icon */}
                <div className="flex justify-center mb-3">
                  <div className="inline-flex items-center justify-center p-2 rounded-full bg-slate-100 dark:bg-white/5">
                    {getDomainIcon(q.domain)}
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-6">
                  {thai ? q.textTh : q.textEn}
                </h3>

                {/* Pill Segmented Control */}
                <div className="flex w-full max-w-2xl mx-auto rounded-full border border-slate-300 dark:border-white/20 overflow-hidden bg-slate-100 dark:bg-white/5">
                  <button
                    onClick={() => handleAnswer(q.id, "basic")}
                    className={`flex-1 py-3 text-sm font-bold transition-colors border-r border-slate-300 dark:border-white/20 ${answers[q.id] === "basic" ? "bg-red-500 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"}`}
                  >
                    {thai ? "ไม่เห็นด้วย" : "Disagree"}
                  </button>
                  <button
                    onClick={() => handleAnswer(q.id, "intermediate")}
                    className={`flex-1 py-3 text-sm font-bold transition-colors border-r border-slate-300 dark:border-white/20 ${answers[q.id] === "intermediate" ? "bg-slate-500 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"}`}
                  >
                    {thai ? "เฉยๆ" : "Neutral"}
                  </button>
                  <button
                    onClick={() => handleAnswer(q.id, "advanced")}
                    className={`flex-1 py-3 text-sm font-bold transition-colors ${answers[q.id] === "advanced" ? "bg-emerald-500 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"}`}
                  >
                    {thai ? "เห็นด้วย" : "Agree"}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between mt-10 w-full mb-10">
        <button
          onClick={handlePrev}
          className="flex items-center justify-center h-12 w-12 rounded-xl border-2 border-slate-300 text-slate-500 hover:border-slate-800 hover:text-slate-800 dark:border-white/20 dark:text-white/50 dark:hover:border-white dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="text-lg font-bold text-slate-800 dark:text-white">
          {thai ? "หน้า" : "Page"} {currentPage} / {totalPages}
        </div>

        <button
          onClick={handleNext}
          disabled={!allAnsweredOnPage}
          className={`flex items-center justify-center px-6 h-12 rounded-xl border-2 transition-colors font-bold ${
            allAnsweredOnPage
              ? "border-slate-800 bg-slate-800 text-white hover:bg-slate-900 dark:border-white dark:bg-white dark:text-slate-900 dark:hover:bg-gray-200"
              : "border-slate-300 bg-slate-100 text-slate-400 cursor-not-allowed dark:border-white/10 dark:bg-white/5 dark:text-white/30"
          }`}
        >
          {currentPage === totalPages ? (thai ? "ส่งคำตอบ" : "Submit") : <ArrowRight size={20} />}
        </button>
      </div>

    </div>
  );
}
