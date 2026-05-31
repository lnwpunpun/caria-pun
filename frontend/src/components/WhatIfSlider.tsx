'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import type { GapItem, CompetencyScores, CareerVector } from '@/types';
import { recomputeRanking, type RankedCareer } from '@/lib/mes-client';
import { cn, formatPercent } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, SlidersHorizontal, Check } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface WhatIfSliderProps {
  gaps: GapItem[];
  currentScores: CompetencyScores;
  allCareers: CareerVector[];
  onRankingChange?: (newRanking: RankedCareer[]) => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Remove prefix like "S01_" and replace underscores with spaces. */
function cleanName(id: string): string {
  return id.replace(/^[A-Z]\d{2}_/, '').replace(/_/g, ' ');
}

function domainColor(domain: string): string {
  switch (domain.toLowerCase()) {
    case 'skills':
      return 'bg-blue-500/20 text-blue-400';
    case 'attitudes':
      return 'bg-purple-500/20 text-purple-400';
    case 'knowledge':
      return 'bg-emerald-500/20 text-emerald-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function WhatIfSlider({
  gaps,
  currentScores,
  allCareers,
  onRankingChange,
  className,
}: WhatIfSliderProps) {
  /* Top 5 gaps */
  const topGaps = useMemo(
    () =>
      [...gaps]
        .sort((a, b) => b.gap_score - a.gap_score)
        .slice(0, 5),
    [gaps],
  );

  /* Slider state */
  const [sliderValues, setSliderValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    topGaps.forEach((g) => {
      init[g.competency_id] = currentScores[g.competency_id] ?? g.student_score;
    });
    return init;
  });

  /* Rankings */
  const [rankings, setRankings] = useState<RankedCareer[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Base rank map (original positions before any slider changes) */
  const baseRankMap = useMemo<Record<string, number>>(() => {
    const base = recomputeRanking(currentScores, allCareers);
    const map: Record<string, number> = {};
    base.forEach((c) => {
      map[c.career_id] = c.rank;
    });
    return map;
  }, [currentScores, allCareers]);

  /* Initial ranking */
  useEffect(() => {
    const initial = recomputeRanking(currentScores, allCareers).slice(0, 3);
    setRankings(initial);
  }, [currentScores, allCareers]);

  /* Handle slider change with debounce */
  const handleSliderChange = useCallback(
    (competencyId: string, value: number) => {
      setSliderValues((prev) => {
        const next = { ...prev, [competencyId]: value };

        /* Debounced re-ranking */
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          const modified = { ...currentScores, ...next };
          const full = recomputeRanking(modified, allCareers);
          setRankings(full.slice(0, 3));
          onRankingChange?.(full);
        }, 100);

        return next;
      });
    },
    [currentScores, allCareers, onRankingChange],
  );

  return (
    <div
      className={cn(
        'bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-[#F39200]/15">
          <SlidersHorizontal size={20} className="text-[#F39200]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">What-If Simulator</h3>
          <p className="text-sm text-gray-400">Adjust your skills to see how rankings change</p>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-5 mb-8">
        {topGaps.map((gap) => {
          const value = sliderValues[gap.competency_id] ?? gap.student_score;
          const pct = value;
          const met = value >= gap.career_required;

          return (
            <div key={gap.competency_id} className="space-y-2">
              {/* Label row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">
                    {cleanName(gap.competency_id)}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] px-1.5 py-0.5 rounded-full font-medium',
                      domainColor(gap.domain),
                    )}
                  >
                    {gap.domain}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-white">{value}</span>
                  <span className="text-xs text-gray-500">/</span>
                  <span className="text-sm font-mono text-[#F39200]">{gap.career_required}</span>
                  {met && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check size={12} className="text-emerald-400" />
                    </span>
                  )}
                </div>
              </div>

              {/* Slider track */}
              <div className="relative">
                {/* Career required marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#F39200]/70 rounded-full z-10 pointer-events-none"
                  style={{ left: `${gap.career_required}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={value}
                  onChange={(e) =>
                    handleSliderChange(gap.competency_id, Number(e.target.value))
                  }
                  className="w-full h-2 rounded-full appearance-none cursor-pointer slider-whatif"
                  style={{
                    background: `linear-gradient(to right, ${met ? '#10B981' : '#3B82F6'} 0%, ${met ? '#10B981' : '#3B82F6'} ${pct}%, rgba(255,255,255,0.1) ${pct}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
          Projected Top 3
        </h4>

        {/* Ranking cards */}
        <div className="space-y-3">
          {rankings.map((career) => {
            const baseRank = baseRankMap[career.career_id] ?? career.rank;
            const diff = baseRank - career.rank; // positive = improved

            return (
              <div
                key={career.career_id}
                className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-xl p-3 transition-all duration-300"
              >
                {/* Rank */}
                <span className="text-xl font-bold text-white/70 w-8 text-center font-mono">
                  {career.rank}
                </span>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{career.career_name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {/* Match bar */}
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-[#F39200] rounded-full transition-all duration-500"
                        style={{ width: `${career.match_percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-gray-400 min-w-[3rem] text-right">
                      {formatPercent(career.match_percentage)}
                    </span>
                  </div>
                </div>

                {/* Change badge */}
                {diff > 0 && (
                  <span className="flex items-center gap-0.5 text-xs font-semibold bg-emerald-500/15 text-emerald-400 px-2 py-1 rounded-lg">
                    <TrendingUp size={12} />↑{diff}
                  </span>
                )}
                {diff < 0 && (
                  <span className="flex items-center gap-0.5 text-xs font-semibold bg-red-500/15 text-red-400 px-2 py-1 rounded-lg">
                    <TrendingDown size={12} />↓{Math.abs(diff)}
                  </span>
                )}
                {diff === 0 && (
                  <span className="flex items-center gap-0.5 text-xs font-medium bg-white/5 text-gray-500 px-2 py-1 rounded-lg">
                    <Minus size={12} />—
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Slider thumb styles */}
      <style jsx>{`
        .slider-whatif::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #F39200;
          border: 2px solid rgba(255, 255, 255, 0.5);
          cursor: pointer;
          box-shadow: 0 0 8px rgba(243, 146, 0, 0.4);
          transition: box-shadow 0.2s;
        }
        .slider-whatif::-webkit-slider-thumb:hover {
          box-shadow: 0 0 14px rgba(243, 146, 0, 0.6);
        }
        .slider-whatif::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #F39200;
          border: 2px solid rgba(255, 255, 255, 0.5);
          cursor: pointer;
          box-shadow: 0 0 8px rgba(243, 146, 0, 0.4);
        }
      `}</style>
    </div>
  );
}
