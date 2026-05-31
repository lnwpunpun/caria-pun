"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Logo } from "@/components/logo"

const COLUMNS = [
  { title: "Product", links: ["How it works", "Assessment", "Radar analysis", "Simulator"] },
  { title: "Company", links: ["About", "Careers", "Research", "Contact"] },
  { title: "Resources", links: ["Documentation", "Competency map", "Privacy", "Terms"] },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Final CTA */}
      <div className="relative mx-auto max-w-5xl px-6 py-28 text-center sm:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(243,146,0,0.18)_0%,_transparent_65%)] blur-3xl"
        />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-balance text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          Your digital career is
          <br />
          <span className="text-brand-orange">one assessment away.</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mt-10"
        >
          <a
            href="#assessment"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-orange px-8 py-4 text-sm font-semibold text-brand-orange-foreground shadow-[0_18px_55px_-12px_rgba(243,146,0,0.7)] transition-transform duration-300 hover:scale-[1.04] active:scale-95"
          >
            Start your assessment
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      {/* Links */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              AI-powered personalized career recommender. Mapping 66 competencies to
              the future of work.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold">{col.title}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/50 transition-colors hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} CARIA-GAP. All rights reserved.</p>
          <p>Built for the digital workforce.</p>
        </div>
      </div>
    </footer>
  )
}
