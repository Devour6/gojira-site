import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import logoImage from "@assets/GOJIRA_X_1767555736780.jpg";
import type { HeroStatsResponse } from "@shared/routes";

function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
}

export function HeroSection() {
  const { data: stats, isLoading } = useQuery<HeroStatsResponse>({
    queryKey: ["/api/stats/hero"],
    refetchInterval: 30000,
  });

  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col items-center justify-center pt-16 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <img 
            src={logoImage} 
            alt="Gojira Logo" 
            className="w-24 h-24 mx-auto rounded-full"
            data-testid="img-hero-logo"
          />
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Pushing the Limits<br />
          of <span className="text-gojira-red gojira-underline">Web3 Innovation</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Gojira Holdings operates at the forefront of blockchain—powering
          Solana with our top-performing validator and investing in the next
          generation of Web3 innovation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 px-8"
            onClick={() => {
              const element = document.getElementById("staking");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            data-testid="button-hero-stake"
          >
            Stake With Us
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="px-8"
            onClick={() => window.location.href = "/validator"}
            data-testid="button-hero-validator"
          >
            Explore Validator <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-border pt-10">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white" data-testid="text-total-staked">
              {isLoading ? "..." : formatNumber(stats?.totalStakedUsd ?? 0)}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1">
              Total Assets Staked
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white" data-testid="text-apy">
              {isLoading ? "..." : `${stats?.apy ?? 0}%`}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1">
              APY
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white" data-testid="text-uptime">
              {isLoading ? "..." : `${stats?.uptime30d ?? 0}%`}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1">
              Uptime (30D)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
