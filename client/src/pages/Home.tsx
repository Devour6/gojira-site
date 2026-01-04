import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useHeroStats, usePortfolio } from "@/hooks/use-data";
import { ArrowRight, Server, Shield, Zap, Globe, Cpu } from "lucide-react";
import { StakingWidget } from "@/components/StakingWidget";

// Hero Section Component
function Hero() {
  const { data: stats } = useHeroStats();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-white/80">
              System Operational • {stats?.uptime30d}% Uptime
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold font-display text-white leading-tight tracking-tighter mb-6">
            KING OF THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600 text-glow">
              NODES
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
            Pushing the limits of Web3 infrastructure. We provide enterprise-grade validation services for the Solana ecosystem with unmatched reliability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/validator"
              className="px-8 py-4 bg-primary text-white font-bold font-display uppercase tracking-wider rounded-sm hover:bg-primary/90 transition-all flex items-center justify-center space-x-2"
            >
              <span>Start Staking</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#portfolio"
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold font-display uppercase tracking-wider rounded-sm hover:bg-white/5 transition-all flex items-center justify-center"
            >
              View Portfolio
            </a>
          </div>

          {/* Stats Ticker */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">
            <div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Total Staked</div>
              <div className="text-2xl font-bold font-mono text-white">
                ${stats ? (stats.totalStakedUsd / 1000000).toFixed(1) : "0"}M
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">SOL Price</div>
              <div className="text-2xl font-bold font-mono text-white">
                ${stats?.solPrice.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">APY</div>
              <div className="text-2xl font-bold font-mono text-primary">
                {stats?.apy}%
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Hero Visual/Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative rings */}
          <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          
          <div className="relative z-10 transform lg:translate-x-12">
            <StakingWidget />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Portfolio Section
function Portfolio() {
  const { data: items, isLoading } = usePortfolio();

  return (
    <section id="portfolio" className="py-24 bg-[#0F0F0F] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
            Our Portfolio
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Backing the most promising protocols building the future of decentralized finance.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-card animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items?.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="h-48 overflow-hidden relative bg-black/50">
                  {/* Fallback image logic */}
                  {item.imageUrl ? (
                     <img 
                       src={item.imageUrl} 
                       alt={item.name} 
                       className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                     />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                      <span className="text-4xl font-bold text-white/10">{item.name[0]}</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/10">
                    {item.category}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold font-display text-white mb-3 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {item.description}
                  </p>
                  <a
                    href={item.websiteUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-bold uppercase tracking-wide text-white hover:text-primary transition-colors"
                  >
                    Visit Website <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Features Section
function Features() {
  const features = [
    {
      icon: Server,
      title: "High Performance",
      description: "Enterprise-grade hardware located in top-tier data centers ensuring maximum uptime and efficiency."
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Multi-layer security protocols, 24/7 monitoring, and HSM-backed key management."
    },
    {
      icon: Zap,
      title: "Low Latency",
      description: "Optimized network topology and direct peering with major exchanges for faster block propagation."
    }
  ];

  return (
    <section className="py-24 bg-background border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-card/50 p-8 rounded-2xl border border-white/5 hover:bg-card hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Portfolio />
      <Footer />
    </div>
  );
}
