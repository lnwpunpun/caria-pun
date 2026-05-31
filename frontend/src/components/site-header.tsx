"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"

const NAV = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Assessment", href: "#assessment" },
  { label: "Results", href: "#results" },
  { label: "Simulator", href: "#simulator" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2.5 transition-all duration-500",
          scrolled
            ? "glass border border-white/40 shadow-[0_8px_40px_-12px_rgba(0,16,40,0.25)]"
            : "border border-transparent",
        )}
      >
        <a href="#top" className="pl-2">
          <Logo />
          <span className="sr-only">CARIA-GAP home</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#assessment"
            className="group hidden items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-brand-orange-foreground shadow-[0_10px_30px_-8px_rgba(243,146,0,0.6)] transition-transform duration-300 hover:scale-[1.04] active:scale-95 sm:inline-flex"
          >
            Start Assessment
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-foreground/10 text-foreground md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-auto mt-2 max-w-6xl rounded-3xl border border-white/40 p-3 md:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-foreground/5"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#assessment"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-semibold text-brand-orange-foreground"
            >
              Start Assessment <ArrowRight className="size-4" />
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
