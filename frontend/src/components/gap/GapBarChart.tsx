'use client';

import type { GapItem } from '@/types';
import { cn } from '@/lib/utils';
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
    <div className="bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-xl">
      <p className="text-white font-medium text-sm mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex justify-between gap-4 text-sm">
            <span style={{ color: entry.color }}>{entry.name}</span>
            <span className="text-white font-mono">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GapBarChart({ gaps, maxItems = 5, className }: GapBarChartProps) {
  // Take top N gaps and format data for Recharts
  const chartData = gaps.slice(0, maxItems).map((gap) => ({
    name: gap.competency_id.replace(/^[ASK]\d{2}_/, '').replace(/_/g, ' '),
    student: gap.student_score,
    required: gap.career_required,
    gapSize: gap.gap_score,
  }));

  if (!chartData.length) {
    return (
      <div className={cn('flex items-center justify-center p-8 text-white/50 border border-white/10 rounded-2xl bg-white/5', className)}>
        ไม่มีข้อมูล Gap (คุณมีคุณสมบัติครบถ้วน!)
      </div>
    );
  }

  return (
    <div className={cn('bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6', className)}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">Top Gaps ที่ต้องพัฒนา</h3>
        <p className="text-sm text-gray-400 mt-1">เปรียบเทียบคะแนนของคุณกับที่อาชีพต้องการ</p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis type="number" domain={[0, 100]} stroke="#64748B" />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={150} 
              tick={{ fill: '#E2E8F0', fontSize: 12 }} 
              axisLine={false} 
              tickLine={false}
            />
            <Tooltip content={<GapTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar 
              dataKey="student" 
              name="Your Score" 
              fill="#3B82F6" 
              radius={[0, 4, 4, 0]} 
              barSize={12} 
            />
            <Bar 
              dataKey="required" 
              name="Required Score" 
              fill="#F39200" 
              radius={[0, 4, 4, 0]} 
              barSize={12} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
