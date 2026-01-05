import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioListResponse } from "@shared/routes";

export function PortfolioSection() {
  const { data: portfolioItems, isLoading } = useQuery<PortfolioListResponse>({
    queryKey: ["/api/portfolio"],
  });

  return (
    <section id="portfolio" className="py-24 px-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gojira-red/5 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-gojira-red border-gojira-red/30 bg-gojira-red/10 px-4 py-1">
            OUR INVESTMENTS
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Strategic <span className="text-gojira-red">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Backing the most promising projects across the blockchain ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-6 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
                <div className="h-6 bg-muted rounded animate-pulse mb-3" />
                <div className="h-4 bg-muted rounded w-16 animate-pulse" />
              </div>
            ))
          ) : (
            portfolioItems?.map((item, index) => (
              <a 
                key={item.id} 
                href={item.websiteUrl ?? "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid={`card-portfolio-${item.id}`}
                className="group relative"
              >
                <div className="p-6 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm hover-elevate transition-all duration-300">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-gojira-red" />
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-xs text-muted-foreground font-mono">0{index + 1}</span>
                  </div>
                  
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-gojira-red transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-3">
                    {item.description}
                  </p>
                  
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
