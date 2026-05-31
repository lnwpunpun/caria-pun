'use client';

import type { CourseRec } from '@/types';
import { cn } from '@/lib/utils';
import { ExternalLink, Clock, GraduationCap } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CourseCardProps {
  course: CourseRec;
  gapScore?: number;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function providerStyle(provider: string): string {
  switch (provider.toLowerCase()) {
    case 'coursera':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'skooldio':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

function gapFillColor(gap: number): string {
  if (gap > 30) return 'bg-red-500';
  if (gap >= 15) return 'bg-amber-500';
  return 'bg-emerald-500';
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CourseCard({ course, gapScore, className }: CourseCardProps) {
  return (
    <div
      className={cn(
        'bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5',
        'hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#F39200]/10',
        'transition-all duration-300 group flex flex-col',
        className,
      )}
    >
      {/* Top row — provider + affiliate */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={cn(
            'text-[11px] font-semibold px-2.5 py-0.5 rounded-full border',
            providerStyle(course.provider),
          )}
        >
          {course.provider}
        </span>
        {course.affiliate && (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F39200]/15 text-[#F39200] border border-[#F39200]/20">
            Partner
          </span>
        )}
      </div>

      {/* Title */}
      <h4 className="text-lg font-semibold text-white group-hover:text-[#F39200] transition-colors leading-snug mb-3">
        {course.title}
      </h4>

      {/* Info row */}
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
        <span className="flex items-center gap-1.5">
          <Clock size={14} />
          {course.duration_hours}h
        </span>
        <span className="flex items-center gap-1.5">
          <GraduationCap size={14} />
          {course.level ?? 'All Levels'}
        </span>
      </div>

      {/* Price */}
      <div className="mb-3">
        {course.price_thb === 0 ? (
          <span className="inline-flex items-center text-sm font-semibold bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-lg">
            ฟรี
          </span>
        ) : (
          <span className="text-white font-semibold text-sm">
            ฿{course.price_thb.toLocaleString()}
          </span>
        )}
      </div>

      {/* Gap progress */}
      {gapScore !== undefined && gapScore > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <span>Gap Addressed</span>
            <span className="font-mono">{gapScore.toFixed(1)}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-500', gapFillColor(gapScore))}
              style={{ width: `${Math.min(gapScore, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Spacer to push CTA down */}
      <div className="flex-1" />

      {/* CTA */}
      <a
        href={course.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'w-full mt-4 flex items-center justify-center gap-2 font-medium',
          'bg-[#F39200]/20 hover:bg-[#F39200]/30 text-[#F39200]',
          'border border-[#F39200]/30 rounded-xl py-2.5 px-4',
          'transition-all duration-200',
        )}
      >
        Enroll Now
        <ExternalLink size={16} />
      </a>
    </div>
  );
}
