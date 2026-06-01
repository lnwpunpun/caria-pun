"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Target, Briefcase, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function CareerRoadmapTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { t, lang } = useLanguage();
  const thai = lang === "th";

  const milestones = [
    {
      month: "Month 1-2",
      title: thai ? "ปิด Gap ทักษะพื้นฐาน (Foundation Gap)" : "Close Foundation Skill Gaps",
      description: thai ? "เรียนคอร์ส Python และ Data Analysis พื้นฐาน" : "Learn Python and foundational Data Analysis courses",
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      month: "Month 3-4",
      title: thai ? "สร้างโปรเจกต์จริง (Portfolio Building)" : "Build Portfolio Projects",
      description: thai ? "ทำโปรเจกต์วิเคราะห์ข้อมูลจริง 2-3 งานเพื่อใส่ลงในเรซูเม่" : "Complete 2-3 real data analysis projects to add to your resume",
      icon: Target,
      color: "text-accent",
      bg: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      month: "Month 5",
      title: thai ? "ยกระดับ Attitude & Knowledge" : "Elevate Attitude & Knowledge",
      description: thai ? "ฝึกฝนการสื่อสาร (Communication) และเตรียมตัวสัมภาษณ์" : "Practice communication skills and prepare for job interviews",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      month: "Month 6",
      title: thai ? "พร้อมสำหรับการสมัครงาน (Job Ready)" : "Job Ready Status",
      description: thai ? "ยื่นใบสมัครในตำแหน่ง Data Analyst หรือสายที่ใกล้เคียง" : "Submit applications for Data Analyst or related roles",
      icon: Briefcase,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
  ];

  return (
    <div ref={ref} className="mt-24 max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h3 className={`text-3xl font-bold mb-4 text-slate-900 dark:text-white ${thai ? "font-thai leading-snug" : "font-syne"}`}>
          {t.results.roadmapTitle} <span className="text-accent">{t.results.roadmapTitleAccent}</span>
        </h3>
        <p className={`text-muted-foreground ${thai ? "font-thai leading-relaxed" : "font-dm"}`}>
          {t.results.roadmapSubtitle}
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10 transform md:-translate-x-1/2" />

        <div className="space-y-12">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                className={`relative flex items-center ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white dark:bg-[#0a0f1c] border-2 border-slate-200 dark:border-white/20 transform -translate-x-1/2 flex items-center justify-center z-10">
                  <div className={`w-3 h-3 rounded-full ${milestone.bg.replace('/10', '')}`} />
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 w-full md:w-1/2 ${isEven ? "md:pr-16" : "md:pl-16"}`}>
                  <div className={`p-6 rounded-2xl border bg-white dark:bg-[#0d1726]/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow ${milestone.borderColor} dark:border-white/5`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${milestone.bg} ${milestone.color}`}>
                        <Icon size={20} />
                      </div>
                      <span className="text-sm font-bold font-syne tracking-wide text-slate-500 dark:text-slate-400">
                        {milestone.month}
                      </span>
                    </div>
                    <h4 className={`text-lg font-bold text-slate-900 dark:text-white mb-2 ${thai ? "font-thai leading-relaxed" : "font-syne"}`}>
                      {milestone.title}
                    </h4>
                    <p className={`text-sm text-muted-foreground ${thai ? "font-thai leading-loose" : "font-dm leading-relaxed"}`}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
