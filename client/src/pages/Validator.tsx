import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StakingWidget } from "@/components/StakingWidget";
import { useValidatorStats } from "@/hooks/use-data";
import { Copy, CheckCircle, AlertTriangle, MapPin, Globe, Server } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function ValidatorPage() {
  const { data: stats, isLoading } = useValidatorStats();
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Validator address copied successfully.",
    });
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left Column: Validator Details */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-white/10 rounded-2xl p-8"
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-primary/30">
                    G
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold font-display text-white">
                      Gojira Validator
                    </h1>
                    <div className="flex items-center text-green-500 space-x-2 text-sm font-medium mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span>{stats?.status || "Active"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="group bg-black/20 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="text-xs font-bold uppercase text-muted-foreground mb-2">Vote Account</div>
                    <div className="flex items-center justify-between">
                      <code className="text-white font-mono break-all text-sm md:text-base">
                        {isLoading ? "Loading..." : stats?.voteAccount}
                      </code>
                      <button 
                        onClick={() => stats?.voteAccount && copyToClipboard(stats.voteAccount)}
                        className="p-2 hover:bg-white/10 rounded-md text-muted-foreground hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="group bg-black/20 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="text-xs font-bold uppercase text-muted-foreground mb-2">Identity</div>
                    <div className="flex items-center justify-between">
                      <code className="text-white font-mono break-all text-sm md:text-base">
                        {isLoading ? "Loading..." : stats?.identity}
                      </code>
                      <button 
                        onClick={() => stats?.identity && copyToClipboard(stats.identity)}
                        className="p-2 hover:bg-white/10 rounded-md text-muted-foreground hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  <div className="bg-background/50 p-4 rounded-lg border border-white/5 text-center">
                    <div className="text-primary mb-2 flex justify-center"><CheckCircle className="w-6 h-6" /></div>
                    <div className="text-2xl font-bold text-white font-mono">{stats?.uptime30d}%</div>
                    <div className="text-xs text-muted-foreground uppercase">30d Uptime</div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg border border-white/5 text-center">
                    <div className="text-primary mb-2 flex justify-center"><AlertTriangle className="w-6 h-6" /></div>
                    <div className="text-2xl font-bold text-white font-mono">{stats?.commission}%</div>
                    <div className="text-xs text-muted-foreground uppercase">Commission</div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg border border-white/5 text-center">
                    <div className="text-primary mb-2 flex justify-center"><Server className="w-6 h-6" /></div>
                    <div className="text-2xl font-bold text-white font-mono">{stats?.version}</div>
                    <div className="text-xs text-muted-foreground uppercase">Version</div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg border border-white/5 text-center">
                    <div className="text-primary mb-2 flex justify-center"><MapPin className="w-6 h-6" /></div>
                    <div className="text-lg font-bold text-white font-mono pt-1">{stats?.location}</div>
                    <div className="text-xs text-muted-foreground uppercase">Location</div>
                  </div>
                </div>
              </motion.div>

              {/* Hardware Specs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-white/10 rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold font-display text-white mb-6">Hardware Specifications</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-muted-foreground">AMD EPYC™ 7003 Series Processors</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-muted-foreground">512GB DDR4 ECC RAM</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-muted-foreground">2x 4TB NVMe SSD (RAID 1)</span>
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-muted-foreground">10 Gbps Uplink</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-muted-foreground">24/7 Monitoring & Alerting</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-muted-foreground">Distributed Failover System</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Staking Widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <StakingWidget />
                
                <div className="mt-8 bg-card border border-white/5 rounded-xl p-6">
                  <h4 className="text-white font-bold mb-2">Why stake with Gojira?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    We prioritize security and uptime above all else. Your stake contributes to network decentralization while earning maximum rewards.
                  </p>
                  <a href="#" className="text-primary text-sm font-bold uppercase hover:underline">
                    View Staking Guide
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
