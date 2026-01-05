import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gojiraSilhouette from "@assets/GOJIRA_STAKE_TEMPLATE_SVG_1767555625218.jpg";
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
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url(${gojiraSilhouette})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Pushing the Limits<br />
          of <span className="text-gojira-red">Web3 Innovation</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Gojira Holdings operates at the forefront of blockchain—powering
          Solana with our top-performing validator and investing in the next
          generation of Web3 innovation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
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
            onClick={() => window.location.href = "/validator"}
            data-testid="button-hero-validator"
          >
            Explore Validator <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="text-center p-4 md:p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="text-xl md:text-2xl font-bold text-white mb-2" data-testid="text-total-staked">
              {formatNumber(stats?.totalStakedUsd ?? 0)}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              AUM
            </div>
          </div>
          <div className="text-center p-4 md:p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="text-xl md:text-2xl font-bold text-white mb-2" data-testid="text-apy">
              {`${stats?.apy ?? 0}%`}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              APY
            </div>
          </div>
          <div className="text-center p-4 md:p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="text-xl md:text-2xl font-bold text-white mb-2" data-testid="text-uptime">
              {`${stats?.uptime30d ?? 0}%`}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Uptime (30D)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
