'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Check } from 'lucide-react';
import { STEPS } from '@/lib/constants';
import { cn } from '@/lib/utils';

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

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <span className="text-xl font-extrabold gradient-text tracking-tight group-hover:brightness-110 transition-all">
              CARIA-GAP
            </span>
            <span className="hidden sm:inline text-[10px] text-white/30 border border-white/10 rounded px-1.5 py-0.5 font-mono">
              v2
            </span>
          </Link>

          {/* Step progress indicator */}
          <div className="hidden sm:flex items-center gap-0">
            {STEPS.map((step, idx) => {
              const isCompleted = idx < activeIdx;
              const isActive = idx === activeIdx;
              const isFuture = idx > activeIdx;

              return (
                <div key={step.id} className="flex items-center">
                  {/* Connector line (before step, except first) */}
                  {idx > 0 && (
                    <div
                      className={cn(
                        'w-8 md:w-12 h-0.5 transition-colors duration-300',
                        isCompleted || isActive
                          ? 'bg-accent/60'
                          : 'bg-white/10',
                      )}
                    />
                  )}

                  {/* Step circle + label */}
                  <Link
                    href={step.path}
                    className="flex flex-col items-center gap-1 group/step"
                  >
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold',
                        'transition-all duration-300 border-2',
                        isCompleted && 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30',
                        isActive && 'bg-accent border-accent text-slate-900 shadow-lg shadow-accent/30 animate-pulse-glow',
                        isFuture && 'border-white/20 text-white/40 group-hover/step:border-white/40 group-hover/step:text-white/60',
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" strokeWidth={3} />
                      ) : (
                        step.id
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-[10px] md:text-xs font-medium whitespace-nowrap transition-colors duration-300',
                        isCompleted && 'text-emerald-400',
                        isActive && 'text-accent',
                        isFuture && 'text-white/30',
                      )}
                    >
                      {step.label}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right spacer (for balance) */}
          <div className="w-24 shrink-0" />
        </div>
      </div>
    </nav>
  );
}
