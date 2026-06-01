"use client";

import { useMemo } from "react";
import { SUT_COURSES, SutCourse } from "@/lib/sut-courses";
import { DT_BRANCH, DC_BRANCH, CareerGroup } from "@/lib/careers-list";
import { GraduationCap, Link2, BookMarked } from "lucide-react";

interface CourseMatcherProps {
  careerName: string;
  gaps: Array<{ competency_id: string; gap_score: number }>;
  lang: "th" | "en";
}

export function CourseMatcher({ careerName, gaps, lang }: CourseMatcherProps) {
  const thai = lang === "th";

  // Find career group and other careers in the same group
  const groupDetails = useMemo(() => {
    let foundGroup: CareerGroup | null = null;
    let foundBranch = "";

    // Search DT
    for (const group of DT_BRANCH) {
      if (group.careers.some(c => c.name.toLowerCase() === careerName.toLowerCase() || c.nameTh === careerName)) {
        foundGroup = group;
        foundBranch = "DT (Digital Technology)";
        break;
      }
    }
    // Search DC if not found
    if (!foundGroup) {
      for (const group of DC_BRANCH) {
        if (group.careers.some(c => c.name.toLowerCase() === careerName.toLowerCase() || c.nameTh === careerName)) {
          foundGroup = group;
          foundBranch = "DC (Digital Communication/Media)";
          break;
        }
      }
    }

    return { group: foundGroup, branch: foundBranch };
  }, [careerName]);

  // Find SUT courses matching the user's gaps
  const matchedCourses = useMemo(() => {
    const gapIds = gaps.map(g => g.competency_id);
    const recommended: SutCourse[] = [];

    SUT_COURSES.forEach(course => {
      // If course covers any of the student's gaps
      const matches = course.competency_tags.filter(tag => gapIds.includes(tag));
      if (matches.length > 0) {
        recommended.push(course);
      }
    });

    // Sort by year and term
    return recommended.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.term - b.term;
    });
  }, [gaps]);

  const { group, branch } = groupDetails;

  return (
    <div className="space-y-6">
      
      {/* 1. Career Group & Other Careers Classification */}
      {group && (
        <div className="rounded-2xl border border-border/60 bg-card/50 dark:bg-card/30 backdrop-blur-md p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-orange/10 border border-brand-orange/20 text-brand-orange">
              {branch}
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-500">
              {thai ? "การวิเคราะห์โครงสร้างอาชีพ" : "Career Architecture"}
            </span>
          </div>

          <h3 className="text-lg font-bold text-foreground mb-2">
            {thai ? "กลุ่มอาชีพหลัก:" : "Main Career Group:"}{" "}
            <span className="text-brand-orange font-bold">
              {thai ? (group.nameTh || group.name) : group.name}
            </span>
          </h3>

          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            {thai 
              ? "อาชีพของคุณได้รับการวิเคราะห์ให้อยู่ในกลุ่มนี้ โดยในหลักสูตรวิชาการของ มทส. มีอาชีพย่อยที่ใช้ฐานสมรรถนะใกล้เคียงกันรองรับ ดังนี้:"
              : "Your target career belongs to this group. SUT's curriculum supports these related careers with similar competency baselines:"}
          </p>

          <div className="flex flex-wrap gap-2">
            {group.careers.map((c, idx) => {
              const isCurrent = c.name.toLowerCase() === careerName.toLowerCase() || c.nameTh === careerName;
              return (
                <span
                  key={idx}
                  className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all ${
                    isCurrent
                      ? "bg-brand-orange/10 border-brand-orange text-brand-orange shadow-sm font-bold"
                      : "bg-muted/40 dark:bg-white/[0.02] border-border/50 dark:border-white/5 text-muted-foreground"
                  }`}
                >
                  {thai ? (c.nameTh || c.name) : c.name} {isCurrent && "🎯"}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. SUT (มทส.) Course Matcher */}
      <div className="rounded-2xl border border-border/60 bg-card/50 dark:bg-card/30 backdrop-blur-md p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
              <GraduationCap size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                {thai ? "การจับคู่รายวิชาหลักสูตร มทส." : "SUT Curriculum Course Mapping"}
              </h3>
              <p className="text-[10px] text-muted-foreground">
                {thai ? "รายวิชาในหลักสูตรจริงของมหาวิทยาลัยเพื่อเรียนปิดช่องว่างความรู้" : "Actual university courses to close your gaps"}
              </p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            {matchedCourses.length} {thai ? "รายวิชาแนะนำ" : "courses matched"}
          </span>
        </div>

        {matchedCourses.length > 0 ? (
          <div className="grid gap-3.5 sm:grid-cols-2">
            {matchedCourses.map((course) => (
              <div
                key={course.course_id}
                className="p-4 rounded-xl border border-border/50 dark:border-white/5 bg-muted/30 dark:bg-white/[0.01] hover:bg-muted/50 dark:hover:bg-white/[0.03] transition-all hover:border-border/80 dark:hover:border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-emerald-500">
                      Code: {course.course_id}
                    </span>
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-muted/60 dark:bg-white/5 text-muted-foreground">
                      {thai ? `ปี ${course.year} เทอม ${course.term}` : `Y${course.year} / T${course.term}`}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-foreground mb-1">
                    {thai ? course.name_th : course.name_en}
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-border/60 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[9px] text-muted-foreground font-semibold">
                    {course.credits} {thai ? "หน่วยกิต" : "Credits"} • {course.module}
                  </span>
                  <a
                    href="https://digitech.sut.ac.th/Digitech-Plan/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[9px] font-extrabold text-emerald-500 hover:text-emerald-600 hover:underline flex items-center gap-0.5"
                  >
                    {thai ? "แผนการเรียน" : "Syllabus"}
                    <Link2 size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-border dark:border-white/10 rounded-xl bg-muted/10 dark:bg-white/[0.01]">
            <BookMarked size={28} className="mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-xs text-muted-foreground">
              {thai ? "ไม่มีรายวิชาที่ต้องเรียนเพิ่มเติมในส่วนนี้" : "No matching courses needed for your current level"}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
