'use client';

import type { CareerResult } from '@/types';
import { cn } from '@/lib/utils';
import { ChevronRight, Star } from 'lucide-react';
import { useMemo } from 'react';
import { useLanguage } from '@/components/language-provider';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CareerCardProps {
  career: CareerResult;
  isTopRank?: boolean;
  onClick?: () => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function programBadge(program: string): string {
  return 'bg-slate-50 text-slate-500 dark:bg-white/5 dark:text-slate-400 border border-slate-200 dark:border-white/10';
}

function rankGradient(rank: number): string {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-b from-amber-400 to-yellow-300 bg-clip-text text-transparent';
    case 2:
      return 'bg-gradient-to-b from-gray-300 to-gray-400 bg-clip-text text-transparent';
    case 3:
      return 'bg-gradient-to-b from-amber-600 to-amber-700 bg-clip-text text-transparent';
    default:
      return 'text-gray-500';
  }
}

function matchColor(pct: number): string {
  if (pct >= 80) return '#10B981';
  if (pct >= 60) return '#F39200';
  return '#F59E0B';
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CareerCard({ career, isTopRank, onClick, className }: CareerCardProps) {
  const { lang } = useLanguage();
  const thai = lang === 'th';
  const { rank, career_name, career_group, program, match_percentage, top_strengths, top_gaps } =
    career;

  const size = isTopRank ? 80 : 64;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = useMemo(
    () => circumference - (match_percentage / 100) * circumference,
    [circumference, match_percentage],
  );

  const strokeColor = matchColor(match_percentage);

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white dark:bg-[#0a0f1c]/60 backdrop-blur-xl border rounded-2xl overflow-hidden cursor-pointer',
        'hover:-translate-y-1 transition-all duration-300 group relative',
        isTopRank
          ? 'p-6 border-slate-200/60 dark:border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]'
          : 'p-4 border-slate-200/50 dark:border-white/5 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_-12px_rgba(0,0,0,0.4)]',
        className,
      )}
    >
      <div className={cn('flex items-center', isTopRank ? 'gap-6' : 'gap-4')}>
        {/* Rank */}
        <div className="flex flex-col items-center shrink-0">
          {rank === 1 && (
            <Star
              size={isTopRank ? 20 : 16}
              className="text-amber-400 mb-0.5"
              fill="currentColor"
            />
          )}
          <span
            className={cn(
              'font-extrabold font-mono leading-none',
              isTopRank ? 'text-4xl' : rank <= 3 ? 'text-2xl' : 'text-xl',
              rankGradient(rank),
            )}
          >
            {rank}
          </span>
        </div>

        {/* Center info */}
        <div className="flex-1 min-w-0">
          <h4
            className={cn(
              'font-semibold text-foreground truncate',
              isTopRank ? 'text-lg' : 'text-base',
            )}
          >
            {career_name}
          </h4>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-slate-50 text-slate-500 dark:bg-white/5 dark:text-slate-400 border border-slate-200 dark:border-white/10 text-[10px] px-2 py-0.5 rounded-full font-medium">
              {career_group}
            </span>
            <span
              className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', programBadge(program))}
            >
              {program}
            </span>
          </div>

          {/* Strength + Gap tags */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {top_strengths.slice(0, 2).map((s) => (
              <span
                key={s}
                className="flex items-center gap-1.5 bg-slate-50 text-slate-500 dark:bg-white/5 dark:text-slate-400 border border-slate-200/60 dark:border-white/10 text-[10px] px-2 py-0.5 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></span>
                {s}
              </span>
            ))}
            {top_gaps.slice(0, 2).map((g) => (
              <span
                key={g}
                className="flex items-center gap-1.5 bg-slate-50 text-slate-500 dark:bg-white/5 dark:text-slate-400 border border-slate-200/60 dark:border-white/10 text-[10px] px-2 py-0.5 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400/80"></span>
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Circular percentage */}
        <div className="shrink-0 flex flex-col items-center">
          <svg width={size} height={size} className="rotate-[-90deg]">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(148,163,184,0.3)"
              strokeWidth={strokeWidth}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
          </svg>
          <span
            className={cn(
              'font-bold font-mono -mt-[calc(50%+8px)] mb-2',
              isTopRank ? 'text-sm' : 'text-xs',
            )}
            style={{ color: strokeColor }}
          >
            {match_percentage}%
          </span>
        </div>
      </div>

      {/* Hover action */}
      <div className={cn(
        "flex items-center gap-1 text-brand-orange text-xs font-semibold mt-4 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300",
        isTopRank ? "mt-4" : "mt-3"
      )}>
        <span>{thai ? 'ดูวิเคราะห์ช่องว่าง (Gap Analysis)' : 'View Gap Analysis'}</span>
        <ChevronRight size={14} />
      </div>
    </div>
  );
}
