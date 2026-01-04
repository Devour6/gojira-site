import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, CheckCircle } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { useState } from "react";
import type { ValidatorStatsResponse, StakingStatsResponse } from "@shared/routes";
import logoImage from "@assets/GOJIRA_X_1767555736780.jpg";

export default function Validator() {
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [amount, setAmount] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { data: validatorData, isLoading: validatorLoading } = useQuery<ValidatorStatsResponse>({
    queryKey: ["/api/stats/validator"],
  });

  const { data: stakingData, isLoading: stakingLoading } = useQuery<StakingStatsResponse>({
    queryKey: ["/api/stats/staking"],
    refetchInterval: 60000,
  });

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const truncateAddress = (address: string) => {
    if (!address) return "...";
    return `${address.slice(0, 20)}...`;
  };

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Validator Details
            </h1>
            <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
              Our validator infrastructure is meticulously engineered to achieve
              maximum uptime, security, and performance. We've built a resilient network that consistently ranks among the top validators in the Solana ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-semibold text-white">Validator Details</h3>
                  <img src={logoImage} alt="Gojira" className="w-10 h-10 rounded-full" />
                </div>

                <div className="space-y-6">
                  <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                    <span className="text-muted-foreground text-sm shrink-0">Identity</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-sm truncate" data-testid="text-identity">
                        {validatorLoading ? "..." : truncateAddress(validatorData?.identity ?? "")}
                      </span>
                      <button
                        onClick={() => copyToClipboard(validatorData?.identity ?? "", "identity")}
                        className="text-muted-foreground hover:text-white shrink-0"
                        data-testid="button-copy-identity"
                      >
                        {copiedField === "identity" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                    <span className="text-muted-foreground text-sm shrink-0">Vote Account</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-sm truncate" data-testid="text-vote-account">
                        {validatorLoading ? "..." : truncateAddress(validatorData?.voteAccount ?? "")}
                      </span>
                      <button
                        onClick={() => copyToClipboard(validatorData?.voteAccount ?? "", "voteAccount")}
                        className="text-muted-foreground hover:text-white shrink-0"
                        data-testid="button-copy-vote-account"
                      >
                        {copiedField === "voteAccount" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="text-muted-foreground text-sm">Commission</span>
                    <span className="text-white font-medium" data-testid="text-commission">
                      {validatorLoading ? "..." : `${validatorData?.commission}%`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="text-muted-foreground text-sm">APY</span>
                    <span className="text-white font-medium" data-testid="text-validator-apy">
                      {validatorLoading ? "..." : `${validatorData?.apy}%`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="text-muted-foreground text-sm">Uptime (30d)</span>
                    <span className="text-white font-medium" data-testid="text-validator-uptime">
                      {validatorLoading ? "..." : `${validatorData?.uptime30d}%`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Status</span>
                    <div className="flex items-center gap-2" data-testid="badge-status">
                      <span className={`w-2 h-2 rounded-full ${validatorData?.status === "Active" ? "bg-green-500" : "bg-red-500"}`} />
                      <span className={validatorData?.status === "Active" ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                        {validatorLoading ? "..." : validatorData?.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Stake Solana</h3>
                  <span className="text-gojira-red font-medium" data-testid="text-widget-apy">
                    {stakingLoading ? "..." : `${stakingData?.apy?.toFixed(2) ?? "0.00"}% APY`}
                  </span>
                </div>

                <div className="flex mb-6 bg-muted rounded-md p-1">
                  <button
                    onClick={() => setActiveTab("stake")}
                    className={`flex-1 py-2.5 text-sm font-medium rounded transition-colors ${
                      activeTab === "stake"
                        ? "bg-card text-white shadow-sm"
                        : "text-muted-foreground hover:text-white"
                    }`}
                    data-testid="button-validator-tab-stake"
                  >
                    Stake
                  </button>
                  <button
                    onClick={() => setActiveTab("unstake")}
                    className={`flex-1 py-2.5 text-sm font-medium rounded transition-colors ${
                      activeTab === "unstake"
                        ? "bg-card text-white shadow-sm"
                        : "text-muted-foreground hover:text-white"
                    }`}
                    data-testid="button-validator-tab-unstake"
                  >
                    Unstake
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">You're Staking</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs px-3">
                        HALF
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs px-3">
                        MAX
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-muted rounded-md p-4">
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
                      className="flex-1 bg-transparent border-0 text-right text-white text-lg font-medium focus-visible:ring-0"
                      data-testid="input-validator-stake-amount"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90 h-11"
                    data-testid="button-validator-connect-wallet"
                  >
                    Connect Wallet
                  </Button>
                  <Button variant="outline" size="icon" className="h-11 w-11">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4 text-sm">
                  <a href="#" className="text-gojira-red hover:underline block">
                    Disclaimer
                  </a>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Available Balance</span>
                    <span className="text-white font-medium">
                      {stakingLoading ? "..." : `${stakingData?.availableBalance?.toFixed(4) ?? "0.0000"} SOL`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Next Epoch</span>
                    <span className="text-white font-medium">
                      {stakingLoading || !stakingData?.nextEpoch ? "..." : formatDate(stakingData.nextEpoch)}
                    </span>
                  </div>
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                    data-testid="link-discord"
                  >
                    <SiDiscord className="w-4 h-4" />
                    <span>Discord</span>
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
