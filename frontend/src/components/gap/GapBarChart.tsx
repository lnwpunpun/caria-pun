'use client';

import type { GapItem } from '@/types';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/language-provider';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

interface GapBarChartProps {
  gaps: GapItem[];
  maxItems?: number;
  className?: string;
}

function GapTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-card/95 backdrop-blur-md border border-border/80 rounded-xl p-3 shadow-xl text-foreground text-sm">
      <p className="font-semibold mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex justify-between gap-4">
            <span style={{ color: entry.color }} className="font-medium">{entry.name}</span>
            <span className="font-mono font-bold">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GapBarChart({ gaps, maxItems = 5, className }: GapBarChartProps) {
  const { lang } = useLanguage();
  const thai = lang === "th";

  // Take top N gaps and format data for Recharts
  const chartData = gaps.slice(0, maxItems).map((gap) => ({
    name: gap.competency_id.replace(/^[ASK]\d{2}_/, '').replace(/_/g, ' '),
    student: gap.student_score,
    required: gap.career_required,
    gapSize: gap.gap_score,
  }));

  if (!chartData.length) {
    return (
      <div className={cn('flex items-center justify-center p-8 text-muted-foreground border border-border/60 rounded-2xl bg-card/50 backdrop-blur-md', className)}>
        {thai ? "ไม่มีข้อมูล Gap (คุณมีสมรรถนะครบถ้วน!)" : "No Gap data (You are fully qualified!)"}
      </div>
    );
  }

  return (
    <div className={cn('bg-card/50 dark:bg-card/30 backdrop-blur-md border border-border/60 dark:border-white/5 rounded-2xl p-6 shadow-sm', className)}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground">{thai ? "แผนภูมิช่องว่างสมรรถนะ (Top Gaps)" : "Top Gaps Chart"}</h3>
        <p className="text-xs text-muted-foreground mt-1">{thai ? "เปรียบเทียบคะแนนของคุณกับที่อาชีพต้องการ" : "Compare your scores with career requirements"}</p>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" strokeOpacity={0.6} />
            <XAxis type="number" domain={[0, 100]} stroke="var(--muted-foreground)" tick={{ fontSize: 9 }} />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={140} 
              tick={{ fill: 'var(--foreground)', fontSize: 10, fontWeight: 500 }} 
              axisLine={false} 
              tickLine={false}
            />
            <Tooltip content={<GapTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.15 }} />
            <Legend wrapperStyle={{ paddingTop: '15px', fontSize: '11px', fontWeight: 600 }} />
            <Bar 
              dataKey="student" 
              name={thai ? "คะแนนของคุณ" : "Your Score"} 
              fill="#F39200" 
              radius={[0, 4, 4, 0]} 
              barSize={10} 
            />
            <Bar 
              dataKey="required" 
              name={thai ? "คะแนนที่ต้องการ" : "Required Score"} 
              fill="#3B82F6" 
              radius={[0, 4, 4, 0]} 
              barSize={10} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
