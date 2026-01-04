import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { StakingSection } from "@/components/staking-section";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PortfolioSection />
        <StakingSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
