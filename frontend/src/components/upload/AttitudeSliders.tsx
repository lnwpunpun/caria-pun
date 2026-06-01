'use client';

import { cn } from '@/lib/utils';
import { Palette, Briefcase, Rocket, Search, Wrench, Users } from 'lucide-react';

interface AttitudeSlidersProps {
  values: Record<string, number>;
  onChange: (scores: Record<string, number>) => void;
  className?: string;
}

const ATTITUDES = [
  { id: 'A01_Artistic', label_en: 'Artistic', label_th: 'ศิลปะ', icon: Palette, color: '#ec4899' },
  { id: 'A02_Conventional', label_en: 'Conventional', label_th: 'ระเบียบแบบแผน', icon: Briefcase, color: '#3b82f6' },
  { id: 'A03_Enterprising', label_en: 'Enterprising', label_th: 'การประกอบการ', icon: Rocket, color: '#f59e0b' },
  { id: 'A04_Investigative', label_en: 'Investigative', label_th: 'การสืบค้น', icon: Search, color: '#8b5cf6' },
  { id: 'A05_Realistic', label_en: 'Realistic', label_th: 'ปฏิบัตินิยม', icon: Wrench, color: '#10b981' },
  { id: 'A06_Social', label_en: 'Social', label_th: 'สังคม', icon: Users, color: '#f43f5e' },
];

export function AttitudeSliders({ values, onChange, className }: AttitudeSlidersProps) {
  const handleSliderChange = (id: string, newValue: number) => {
    onChange({ ...values, [id]: newValue });
  };

  return (
    <div className={cn('space-y-6', className)}>
      {ATTITUDES.map((att) => {
        const val = values[att.id] ?? 50;
        const Icon = att.icon;
        return (
          <div key={att.id} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon size={18} style={{ color: att.color }} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="font-semibold text-slate-800 dark:text-white/90">{att.label_th}</span>
                <span className="text-xs text-slate-500 dark:text-white/40 hidden sm:inline">({att.label_en})</span>
              </div>
              <div className="font-mono text-sm font-bold text-slate-800 dark:text-white/80 w-8 text-right">{val}</div>
            </div>
            <div className="relative flex items-center h-4">
              <input
                type="range"
                min="0"
                max="100"
                value={val}
                onChange={(e) => handleSliderChange(att.id, parseInt(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-white/10 outline-none z-10"
                style={{
                  background: `linear-gradient(to right, ${att.color} ${val}%, rgba(148,163,184,0.25) ${val}%)`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
