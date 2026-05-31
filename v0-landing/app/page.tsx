import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { AssessmentMockup } from "@/components/assessment-mockup"
import { ResultsShowcase } from "@/components/results-showcase"
import { WhatIfSimulator } from "@/components/what-if-simulator"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="relative bg-background">
      <SiteHeader />
      <HeroSection />
      <HowItWorks />
      <AssessmentMockup />
      <ResultsShowcase />
      <WhatIfSimulator />
      <SiteFooter />
    </main>
  )
}
