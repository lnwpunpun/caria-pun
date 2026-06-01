'use client';

import { useEffect, useState } from "react"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from "motion/react"
import { Check, ArrowRight, Trash2 } from 'lucide-react';
import { STEPS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"

/** Determine which step index (0-based) is active based on pathname */
function getActiveStep(pathname: string): number {
  for (let i = STEPS.length - 1; i >= 0; i--) {
    if (pathname.startsWith(STEPS[i].path)) return i;
  }
  return -1;
}

export default function Navbar() {
  const pathname = usePathname();
  const activeIdx = getActiveStep(pathname);
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2.5 transition-all duration-500",
          scrolled
            ? "bg-white/75 dark:bg-[#0a0f1c]/70 backdrop-blur-xl border border-slate-200/70 dark:border-white/10 shadow-[0_8px_40px_-12px_rgba(0,16,40,0.25)] dark:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] text-slate-900 dark:text-slate-100"
            : "border border-transparent text-slate-900 dark:text-slate-100",
        )}
      >
        <Link href="/" className="pl-2">
          <Logo />
          <span className="sr-only">SUT-CARIA home</span>
        </Link>

        {/* Step progress indicator */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Progress">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < activeIdx;
            const isActive = idx === activeIdx;
            const isFuture = idx > activeIdx;

            return (
              <div key={step.id} className="flex items-center">
                {/* Connector line */}
                {idx > 0 && (
                  <div
                    className={cn(
                      'w-4 md:w-6 h-px mx-1 transition-colors duration-300',
                      isCompleted || isActive
                        ? 'bg-brand-orange/60'
                        : 'bg-slate-300 dark:bg-white/10',
                    )}
                  />
                )}

                {/* Step circle + label */}
                <Link
                  href={step.path}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors group/step"
                >
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold',
                      'transition-all duration-300 border',
                      isCompleted && 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30',
                      isActive && 'bg-brand-orange border-brand-orange text-brand-orange-foreground shadow-lg shadow-brand-orange/30 animate-pulse-glow',
                      isFuture && 'border-slate-300 dark:border-white/20 text-slate-400 dark:text-white/40 group-hover/step:border-slate-500 group-hover/step:text-slate-600 dark:group-hover/step:border-white/50 dark:group-hover/step:text-white/80',
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3" strokeWidth={3} />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-sm font-medium whitespace-nowrap transition-colors duration-300',
                      isCompleted && 'text-emerald-500',
                      isActive && 'text-brand-orange',
                      isFuture && 'text-slate-500 dark:text-white/40',
                    )}
                  >
                    {step.label}
                  </span>
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Actions (Language, Theme, Reset, Start) */}
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle onTop={false} />
          <button
            type="button"
            onClick={() => {
              if (window.confirm("คุณต้องการลบข้อมูลส่วนบุคคล (Assessment Results) ทั้งหมดหรือไม่?")) {
                localStorage.clear();
                window.location.href = "/";
              }
            }}
            className="group hidden items-center gap-2 rounded-full border border-danger/50 bg-danger/10 px-4 py-2.5 text-sm font-semibold text-danger transition-transform duration-300 hover:scale-[1.04] active:scale-95 sm:inline-flex"
            title="ลบข้อมูลส่วนบุคคล"
          >
            <Trash2 className="size-4" />
            <span className="hidden lg:inline">ลบข้อมูล</span>
          </button>
          <a
            href="/assessment"
            className="group hidden items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-brand-orange-foreground shadow-[0_10px_30px_-8px_rgba(243,146,0,0.6)] transition-transform duration-300 hover:scale-[1.04] active:scale-95 sm:inline-flex"
          >
            {t.nav.start}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
