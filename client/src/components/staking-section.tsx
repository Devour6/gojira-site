import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RefreshCw, Zap, Shield, TrendingUp } from "lucide-react";
import type { StakingStatsResponse } from "@shared/routes";

export function StakingSection() {
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [amount, setAmount] = useState("");

  const { data: stakingData, isLoading } = useQuery<StakingStatsResponse>({
    queryKey: ["/api/stats/staking"],
    refetchInterval: 60000,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const features = [
    { icon: Zap, title: "High APY", desc: "Competitive yields" },
    { icon: Shield, title: "Secure", desc: "Enterprise security" },
    { icon: TrendingUp, title: "Reliable", desc: "99.9% uptime" },
  ];

  return (
    <section id="staking" className="py-24 px-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-gojira-red border-gojira-red/30 bg-gojira-red/10 px-4 py-1">
            STAKING MADE SIMPLE
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Stake With the <span className="text-gojira-red text-glow-red">King of Nodes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join those who trust our validator infrastructure. Earn competitive yields
            with our industry-leading uptime and advanced security protocols.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 card-glow text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-gojira-red" />
              </div>
              <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-card border-border card-glow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Stake Solana</h3>
                <span className="text-gojira-red font-bold text-lg" data-testid="text-staking-apy">
                  {isLoading ? "..." : `${stakingData?.apy ?? 0}%`} <span className="text-sm font-normal">APY</span>
                </span>
              </div>

              <div className="flex mb-6 bg-muted/50 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("stake")}
                  className={`flex-1 py-3 text-sm font-medium rounded-md transition-all ${
                    activeTab === "stake"
                      ? "bg-primary text-white shadow-lg glow-red-sm"
                      : "text-muted-foreground hover:text-white"
                  }`}
                  data-testid="button-tab-stake"
                >
                  Stake
                </button>
                <button
                  onClick={() => setActiveTab("unstake")}
                  className={`flex-1 py-3 text-sm font-medium rounded-md transition-all ${
                    activeTab === "unstake"
                      ? "bg-primary text-white shadow-lg glow-red-sm"
                      : "text-muted-foreground hover:text-white"
                  }`}
                  data-testid="button-tab-unstake"
                >
                  Unstake
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">You're Staking</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs px-3 border-primary/30 hover:border-primary" data-testid="button-half">
                      HALF
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs px-3 border-primary/30 hover:border-primary" data-testid="button-max">
                      MAX
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-4 border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-green-400 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">S</span>
                    </div>
                    <span className="text-white font-semibold">SOL</span>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-transparent border-0 text-right text-white text-xl font-semibold focus-visible:ring-0"
                    data-testid="input-stake-amount"
                  />
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90 h-12 text-base font-semibold glow-red-sm"
                  data-testid="button-connect-wallet"
                >
                  Connect Wallet
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 border-primary/30 hover:border-primary" data-testid="button-refresh">
                  <RefreshCw className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4 text-sm">
                <a href="#" className="text-gojira-red hover:underline block font-medium" data-testid="link-disclaimer">
                  Disclaimer
                </a>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Available Balance</span>
                  <span className="text-white font-medium" data-testid="text-available-balance">
                    {isLoading ? "..." : `${stakingData?.availableBalance?.toFixed(4) ?? "0.0000"} SOL`}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Next Epoch</span>
                  <span className="text-white font-medium" data-testid="text-next-epoch">
                    {isLoading || !stakingData?.nextEpoch ? "..." : formatDate(stakingData.nextEpoch)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
