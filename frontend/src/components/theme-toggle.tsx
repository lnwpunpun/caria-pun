"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Sun/Moon theme toggle.
 * `onTop` = the header is floating over the (always-dark) hero, so use light
 * styling; once the page scrolls, switch to theme-aware foreground colours.
 */
export function ThemeToggle({ onTop = false }: { onTop?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Default theme is dark; render the dark-state icon until mounted to avoid
  // a hydration mismatch.
  const isDark = !mounted || resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label="Toggle light/dark theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border transition-colors",
        onTop
          ? "border-white/15 text-white/80 hover:bg-white/10 hover:text-white"
          : "border-foreground/10 text-foreground/80 hover:bg-foreground/5 hover:text-foreground",
      )}
    >
      {isDark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </button>
  )
}
