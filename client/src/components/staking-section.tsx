import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { StakingStatsResponse } from "@shared/routes";

export function StakingSection() {
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

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
    <section id="staking" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-gojira-red border-gojira-red/30 bg-gojira-red/10 px-4 py-1">
            STAKING
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Stake With <span className="text-gojira-red">Gojira</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Earn competitive yields with our high-performance validator infrastructure.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Stake Solana</h3>
                <span className="text-white font-bold text-lg" data-testid="text-staking-apy">
                  {isLoading ? "..." : `${stakingData?.apy ?? 0}%`} <span className="text-sm font-normal text-muted-foreground">APY</span>
                </span>
              </div>

              <div className="flex mb-6 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("stake")}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                    activeTab === "stake"
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-white"
                  }`}
                  data-testid="button-tab-stake"
                >
                  Stake
                </button>
                <button
                  onClick={() => setActiveTab("unstake")}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                    activeTab === "unstake"
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-white"
                  }`}
                  data-testid="button-tab-unstake"
                >
                  Unstake
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" data-testid="button-half">
                      HALF
                    </Button>
                    <Button variant="outline" size="sm" data-testid="button-max">
                      MAX
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-muted rounded-lg p-4">
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
                  className="flex-1 bg-primary hover:bg-primary/90"
                  data-testid="button-connect-wallet"
                  onClick={() => toast({ title: "Coming Soon", description: "Wallet connection will be available soon." })}
                >
                  Connect Wallet
                </Button>
                <Button variant="outline" size="icon" data-testid="button-refresh">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3 text-sm border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Available Balance</span>
                  <span className="text-white font-medium" data-testid="text-available-balance">
                    {isLoading ? "..." : `${stakingData?.availableBalance?.toFixed(4) ?? "0.0000"} SOL`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
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
