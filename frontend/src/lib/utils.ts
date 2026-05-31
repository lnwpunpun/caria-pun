import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function gapSeverityColor(gap: number): string {
  if (gap >= 30) return 'text-danger';
  if (gap >= 15) return 'text-warning';
  return 'text-success';
}

export function gapSeverityBg(gap: number): string {
  if (gap >= 30) return 'bg-red-500';
  if (gap >= 15) return 'bg-amber-500';
  return 'bg-emerald-500';
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 10) / 10}%`;
}

export function formatScore(value: number): string {
  return Math.round(value).toString();
}

export function showToast(message: string, type: 'info' | 'error' | 'success' = 'info') {
  if (typeof window === 'undefined') return;
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 z-[9999] px-4 py-3 rounded-lg text-white font-medium text-sm shadow-xl animate-slide-up flex items-center gap-2 border border-white/20 backdrop-blur-md ${
    type === 'error' ? 'bg-danger/90' : type === 'success' ? 'bg-success/90' : 'bg-accent/90'
  }`;
  toast.innerHTML = `<span class="animate-pulse">⚠️</span> ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}
