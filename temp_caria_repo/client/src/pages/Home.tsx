/**
 * CARIA-GAP Home Page — Precision Instrument UI
 * Assembles all sections: Navbar, Hero, HowItWorks, Assessment, Results, GapAnalysis, Simulator, Footer
 * Design: Deep Slate-Black #050A14 | Digitech Blue #002F6C | SUT Orange #F39200 accent
 * Typography: Syne (display) + DM Sans (body)
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import AssessmentSection from "@/components/AssessmentSection";
import ResultsSection from "@/components/ResultsSection";
import StatsSection from "@/components/StatsSection";
import GapAnalysisSection from "@/components/GapAnalysisSection";
import SimulatorSection from "@/components/SimulatorSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#050A14", color: "#F0F4FF" }}
    >
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <AssessmentSection />
      <ResultsSection />
      <StatsSection />
      <GapAnalysisSection />
      <SimulatorSection />
      <Footer />
    </div>
  );
}
