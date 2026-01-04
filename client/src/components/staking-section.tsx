import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
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

  return (
    <section id="staking" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-gojira-red border-gojira-red/30 bg-gojira-red/10">
            STAKING MADE SIMPLE
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stake With the <span className="text-gojira-red">King of Nodes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join those who trust our validator infrastructure. Earn competitive yields
            with our industry-leading uptime and advanced security protocols.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-card border-border overflow-hidden">
            <div className="h-1 bg-primary" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Stake Solana</h3>
                <span className="text-gojira-red font-medium" data-testid="text-staking-apy">
                  {isLoading ? "..." : `${stakingData?.apy ?? 0}% APY`}
                </span>
              </div>

              <div className="flex mb-6 bg-muted rounded-md p-1">
                <button
                  onClick={() => setActiveTab("stake")}
                  className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${
                    activeTab === "stake"
                      ? "bg-card text-white"
                      : "text-muted-foreground hover:text-white"
                  }`}
                  data-testid="button-tab-stake"
                >
                  Stake
                </button>
                <button
                  onClick={() => setActiveTab("unstake")}
                  className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${
                    activeTab === "unstake"
                      ? "bg-card text-white"
                      : "text-muted-foreground hover:text-white"
                  }`}
                  data-testid="button-tab-unstake"
                >
                  Unstake
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">You're Staking</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs" data-testid="button-half">
                      HALF
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs" data-testid="button-max">
                      MAX
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-muted rounded-md p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-green-400 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">S</span>
                    </div>
                    <span className="text-white font-medium">SOL</span>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-transparent border-0 text-right text-white text-lg focus-visible:ring-0"
                    data-testid="input-stake-amount"
                  />
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  data-testid="button-connect-wallet"
                >
                  Connect Wallet
                </Button>
                <Button variant="outline" size="icon" data-testid="button-refresh">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3 text-sm">
                <a href="#" className="text-gojira-red hover:underline" data-testid="link-disclaimer">
                  Disclaimer
                </a>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Available Balance</span>
                  <span className="text-white" data-testid="text-available-balance">
                    {isLoading ? "..." : `${stakingData?.availableBalance?.toFixed(4) ?? "0.0000"} SOL`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Next Epoch</span>
                  <span className="text-white" data-testid="text-next-epoch">
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
