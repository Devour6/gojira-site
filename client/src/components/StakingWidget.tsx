import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, ArrowRight, Loader2, TrendingUp } from "lucide-react";
import { useStakingStats } from "@/hooks/use-data";

export function StakingWidget() {
  const { data: stats, isLoading } = useStakingStats();
  const [amount, setAmount] = useState("");
  const [tab, setTab] = useState<"stake" | "unstake">("stake");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // Mock connection delay
    setTimeout(() => setIsConnecting(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-white/10 rounded-xl p-8 h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-card border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
      {/* Header */}
      <div className="bg-black/20 p-6 border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold font-display uppercase tracking-wide text-white">
            Staking Interface
          </h3>
          <div className="flex items-center space-x-2 text-primary">
            <TrendingUp className="w-4 h-4" />
            <span className="font-bold">{stats?.apy.toFixed(1)}% APY</span>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-black/40 p-1 rounded-lg">
          <button
            onClick={() => setTab("stake")}
            className={`flex-1 py-2 text-sm font-bold uppercase rounded-md transition-all ${
              tab === "stake"
                ? "bg-primary text-white shadow-lg"
                : "text-muted-foreground hover:text-white"
            }`}
          >
            Stake
          </button>
          <button
            onClick={() => setTab("unstake")}
            className={`flex-1 py-2 text-sm font-bold uppercase rounded-md transition-all ${
              tab === "unstake"
                ? "bg-primary text-white shadow-lg"
                : "text-muted-foreground hover:text-white"
            }`}
          >
            Unstake
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">
            Amount (SOL)
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-black/40 border border-white/10 rounded-lg py-4 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-lg font-mono"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-primary hover:text-primary/80 uppercase">
              Max
            </button>
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Available: {stats?.availableBalance} SOL</span>
            <span>≈ ${(Number(amount || 0) * 145).toFixed(2)} USD</span>
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-4 border border-primary/10 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Next Epoch</span>
            <span className="text-white font-mono">{new Date(stats?.nextEpoch || "").toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Epoch Progress</span>
            <span className="text-primary font-bold">{stats?.epochProgress}%</span>
          </div>
          <div className="w-full bg-black/40 h-1.5 rounded-full mt-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${stats?.epochProgress}%` }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-wide rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center space-x-2 group"
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Wallet className="w-5 h-5" />
              <span>Connect Wallet</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
