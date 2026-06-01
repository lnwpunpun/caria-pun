import { cn } from "@/lib/utils"

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <img src="/sut-caria-logo.png" alt="SUT-CARIA Logo" className="size-9 object-contain" />
      {showText && (
        <span className="text-base font-semibold tracking-tight">
          SUT<span className="text-brand-orange">-</span>CARIA
        </span>
      )}
    </div>
  )
}
