'use client';

import type { CareerResult } from '@/types';
import { cn } from '@/lib/utils';
import { ChevronRight, Star } from 'lucide-react';
import { useMemo } from 'react';

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
  switch (program.toUpperCase()) {
    case 'DT':
      return 'bg-blue-500/20 text-blue-400';
    case 'DM':
      return 'bg-purple-500/20 text-purple-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
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
        'bg-gray-900/60 backdrop-blur-xl border rounded-2xl overflow-hidden cursor-pointer',
        'hover:scale-[1.02] transition-all duration-300 group',
        isTopRank
          ? 'border-amber-500/30 shadow-lg shadow-amber-500/10 p-6'
          : 'border-white/10 p-4',
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
              'font-semibold text-white truncate',
              isTopRank ? 'text-lg' : 'text-base',
            )}
          >
            {career_name}
          </h4>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-1.5">
            <span className="bg-white/10 text-gray-300 text-xs px-2 py-0.5 rounded-full">
              {career_group}
            </span>
            <span
              className={cn('text-xs px-2 py-0.5 rounded-full font-medium', programBadge(program))}
            >
              {program}
            </span>
          </div>

          {/* Strength + Gap tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {top_strengths.slice(0, 2).map((s) => (
              <span
                key={s}
                className="bg-emerald-500/15 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full"
              >
                {s}
              </span>
            ))}
            {top_gaps.slice(0, 2).map((g) => (
              <span
                key={g}
                className="bg-red-500/15 text-red-400 text-[10px] px-2 py-0.5 rounded-full"
              >
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
              stroke="rgba(255,255,255,0.1)"
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
      <div className="flex items-center gap-1 text-[#F39200] text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span>ดู Gap Analysis</span>
        <ChevronRight size={16} />
      </div>
    </div>
  );
}
