import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, CheckCircle, Loader2 } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { useState, useMemo } from "react";
import type { ValidatorStatsResponse, StakingStatsResponse } from "@shared/routes";
import gojiraBanner from "@assets/GOJIRA_BANNER_1767555604824.jpg";
import useValidator from "@/hooks/use-validator";
import { VALIDATOR_ADDRESS } from "@/lib/constants";
import { useWallet } from "@/hooks/use-wallet";
import { useStaking } from "@/hooks/use-staking";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Validator() {
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [amount, setAmount] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Wallet and staking hooks
  const wallet = useWallet();
  const {
    totalStaked,
    stakeAccounts,
    isLoadingStakeAccounts,
    stake,
    unstake,
    withdraw,
    isStaking,
    isUnstaking,
    refetchStakeAccounts,
  } = useStaking();

  // Fetch real-time validator data from StakeWiz
  const { data: validatorRealData, isLoading: validatorRealLoading } = useValidator();

  // Still fetch additional validator metadata from API (identity, commission, status, etc.)
  const { data: validatorData, isLoading: validatorLoading } = useQuery<ValidatorStatsResponse>({
    queryKey: ["/api/stats/validator"],
  });

  const { data: stakingData, isLoading: stakingLoading } = useQuery<StakingStatsResponse>({
    queryKey: ["/api/stats/staking"],
    refetchInterval: 60000,
  });

  // Combine real-time data with metadata
  const isLoading = validatorRealLoading || validatorLoading;
  const uptime = validatorRealData?.uptime ?? validatorData?.uptime30d ?? 0;
  const apy = validatorRealData?.apy ?? validatorData?.apy ?? 0;

  // Calculate available balance (wallet balance - rent if no stake accounts)
  const availableBalance = useMemo(() => {
    if (!wallet.isConnected) return 0;
    const balance = wallet.balance;
    // If user has no stake accounts, reserve rent for new account
    const rentReserve = stakeAccounts.length === 0 ? 2.28 : 0;
    return Math.max(0, balance - rentReserve);
  }, [wallet.balance, wallet.isConnected, stakeAccounts.length]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const truncateAddress = (address: string) => {
    if (!address) return "...";
    return `${address.slice(0, 20)}...`;
  };

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
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

  // Handle HALF and MAX buttons
  const handleHalf = () => {
    if (activeTab === "stake") {
      setAmount((wallet.balance / 2).toFixed(4));
    } else {
      setAmount((totalStaked / 2).toFixed(4));
    }
  };

  const handleMax = () => {
    if (activeTab === "stake") {
      setAmount(wallet.balance.toFixed(4));
    } else {
      setAmount(totalStaked.toFixed(4));
    }
  };

  // Handle stake/unstake transactions
  const handleStake = async () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const signature = await stake(amountNum);
    if (signature) {
      setAmount("");
      refetchStakeAccounts();
    }
  };

  const handleUnstake = async () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    // Find a stake account to unstake from
    const accountToUnstake = stakeAccounts.find(
      (acc) => acc.lamports / 1e9 >= amountNum && acc.isActive
    );

    if (!accountToUnstake) {
      // If no single account has enough, unstake from the largest one
      const largestAccount = stakeAccounts
        .filter((acc) => acc.isActive)
        .sort((a, b) => b.lamports - a.lamports)[0];

      if (largestAccount) {
        const signature = await unstake(largestAccount.pubkey);
        if (signature) {
          setAmount("");
          refetchStakeAccounts();
        }
      }
    } else {
      const signature = await unstake(accountToUnstake.pubkey);
      if (signature) {
        setAmount("");
        refetchStakeAccounts();
      }
    }
  };

  const handleTransaction = () => {
    if (activeTab === "stake") {
      handleStake();
    } else {
      handleUnstake();
    }
  };

  const isTransactionDisabled = useMemo(() => {
    if (!wallet.isConnected) return true;
    if (isStaking || isUnstaking) return true;
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return true;
    if (activeTab === "stake" && amountNum > wallet.balance) return true;
    if (activeTab === "unstake" && amountNum > totalStaked) return true;
    return false;
  }, [wallet.isConnected, wallet.balance, isStaking, isUnstaking, amount, activeTab, totalStaked]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `url(${gojiraBanner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/90 to-background pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Validator Details
            </h1>
            <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
              Our validator infrastructure is meticulously engineered to achieve
              maximum uptime, security, and performance. We've built a resilient network that consistently ranks among the top validators in the Solana ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 text-center">
              <div className="text-2xl font-bold text-white">{isLoading ? "..." : `${uptime.toFixed(2)}%`}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Uptime</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 text-center">
              <div className="text-2xl font-bold text-white">{isLoading ? "..." : `${apy.toFixed(2)}%`}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">APY</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 text-center">
              <div className="text-2xl font-bold text-white">{validatorLoading ? "..." : `${validatorData?.commission ?? 0}%`}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Commission</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card border-border card-glow">
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white">Validator Details</h3>
                </div>

                <div className="space-y-0">
                  <div className="flex items-start justify-between gap-4 py-4 border-b border-border">
                    <span className="text-muted-foreground text-sm shrink-0">Identity</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-sm truncate" data-testid="text-identity">
                        {validatorLoading ? "..." : truncateAddress(validatorData?.identity ?? "")}
                      </span>
                      <button
                        onClick={() => copyToClipboard(validatorData?.identity ?? "", "identity")}
                        className="text-muted-foreground hover:text-primary shrink-0 transition-colors"
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

                  <div className="flex items-start justify-between gap-4 py-4 border-b border-border">
                    <span className="text-muted-foreground text-sm shrink-0">Vote Account</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-sm truncate" data-testid="text-vote-account">
                        {validatorLoading ? "..." : truncateAddress(validatorData?.voteAccount ?? VALIDATOR_ADDRESS)}
                      </span>
                      <button
                        onClick={() => copyToClipboard(validatorData?.voteAccount ?? VALIDATOR_ADDRESS, "voteAccount")}
                        className="text-muted-foreground hover:text-primary shrink-0 transition-colors"
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

                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <span className="text-muted-foreground text-sm">Commission</span>
                    <span className="text-white font-medium" data-testid="text-commission">
                      {validatorLoading ? "..." : `${validatorData?.commission}%`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <span className="text-muted-foreground text-sm">APY</span>
                    <span className="text-white font-medium" data-testid="text-validator-apy">
                      {isLoading ? "..." : `${apy.toFixed(2)}%`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <span className="text-muted-foreground text-sm">Uptime (30d)</span>
                    <span className="text-white font-medium" data-testid="text-validator-uptime">
                      {isLoading ? "..." : `${uptime.toFixed(2)}%`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <span className="text-muted-foreground text-sm">Status</span>
                    <div className="flex items-center gap-2" data-testid="badge-status">
                      <span className={`w-2 h-2 rounded-full pulse-glow ${validatorData?.status === "Active" ? "bg-green-500" : "bg-red-500"}`} />
                      <span className={validatorData?.status === "Active" ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                        {validatorLoading ? "..." : validatorData?.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border card-glow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Stake Solana</h3>
                  <span className="text-white font-bold text-lg" data-testid="text-widget-apy">
                    {isLoading ? "..." : `${apy.toFixed(2)}%`} <span className="text-sm font-normal">APY</span>
                  </span>
                </div>

                <div className="flex mb-6 bg-muted/50 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab("stake")}
                    className={`flex-1 py-3 text-sm font-medium rounded-md transition-all ${activeTab === "stake"
                      ? "bg-primary text-white shadow-lg glow-red-sm"
                      : "text-muted-foreground hover:text-white"
                      }`}
                    data-testid="button-validator-tab-stake"
                  >
                    Stake
                  </button>
                  <button
                    onClick={() => setActiveTab("unstake")}
                    className={`flex-1 py-3 text-sm font-medium rounded-md transition-all ${activeTab === "unstake"
                      ? "bg-primary text-white shadow-lg glow-red-sm"
                      : "text-muted-foreground hover:text-white"
                      }`}
                    data-testid="button-validator-tab-unstake"
                  >
                    Unstake
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">
                      {activeTab === "stake" ? "Amount to Stake" : "Amount to Unstake"}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs px-3 border-primary/30 hover:border-primary"
                        onClick={handleHalf}
                        disabled={!wallet.isConnected || isStaking || isUnstaking}
                      >
                        HALF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs px-3 border-primary/30 hover:border-primary"
                        onClick={handleMax}
                        disabled={!wallet.isConnected || isStaking || isUnstaking}
                      >
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
                      data-testid="input-validator-stake-amount"
                      disabled={!wallet.isConnected || isStaking || isUnstaking}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mb-6">
                  {wallet.isConnected ? (
                    <>
                      <Button
                        size="lg"
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={handleTransaction}
                        disabled={isTransactionDisabled}
                        data-testid="button-validator-stake-unstake"
                      >
                        {isStaking || isUnstaking ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            {isStaking ? "Staking..." : "Unstaking..."}
                          </>
                        ) : (
                          activeTab === "stake" ? "Stake SOL" : "Unstake SOL"
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          refetchStakeAccounts();
                        }}
                        disabled={isStaking || isUnstaking}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="flex-1">
                      <WalletMultiButton className="!w-full !h-12 !bg-primary hover:!bg-primary/90 !text-white !rounded-lg" />
                    </div>
                  )}
                </div>

                {wallet.isConnected && (
                  <div className="mb-4 p-3 bg-muted/30 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Wallet</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-mono text-xs">
                          {wallet.formatAddress(wallet.publicKey?.toString())}
                        </span>
                        <button
                          onClick={() =>
                            wallet.publicKey &&
                            copyToClipboard(wallet.publicKey.toString(), "wallet")
                          }
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {copiedField === "wallet" ? (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 text-sm">
                  <a href="#" className="text-gojira-red hover:underline block font-medium">
                    Disclaimer
                  </a>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Available Balance</span>
                    <span className="text-white font-medium">
                      {wallet.isConnected
                        ? wallet.isLoadingBalance
                          ? "..."
                          : `${wallet.balance.toFixed(4)} SOL`
                        : stakingLoading
                          ? "..."
                          : `${stakingData?.availableBalance?.toFixed(4) ?? "0.0000"} SOL`}
                    </span>
                  </div>
                  {wallet.isConnected && (
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Total Staked</span>
                      <span className="text-white font-medium">
                        {isLoadingStakeAccounts ? "..." : `${totalStaked.toFixed(4)} SOL`}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Next Epoch</span>
                    <span className="text-white font-medium">
                      {validatorRealLoading || !validatorRealData?.nextEpoch
                        ? (stakingLoading || !stakingData?.nextEpoch ? "..." : formatDate(stakingData.nextEpoch))
                        : formatDate(validatorRealData.nextEpoch)}
                    </span>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors pt-2"
                    data-testid="link-discord"
                  >
                    <SiDiscord className="w-5 h-5" />
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
