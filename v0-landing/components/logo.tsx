import { cn } from "@/lib/utils"

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="relative flex size-9 items-center justify-center" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-brand-blue" />
        <span className="absolute inset-[3px] rounded-full border border-white/30" />
        <span className="absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange" />
        <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-white/80" />
      </span>
      {showText && (
        <span className="text-base font-semibold tracking-tight">
          CARIA<span className="text-brand-orange">-</span>GAP
        </span>
      )}
    </div>
  )
}
