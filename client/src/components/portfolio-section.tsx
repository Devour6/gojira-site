import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { PortfolioListResponse } from "@shared/routes";

export function PortfolioSection() {
  const { data: portfolioItems, isLoading } = useQuery<PortfolioListResponse>({
    queryKey: ["/api/portfolio"],
  });

  return (
    <section id="portfolio" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-gojira-red border-gojira-red/30 bg-gojira-red/10 px-4 py-1">
            OUR INVESTMENTS
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Strategic <span className="text-gojira-red">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We've strategically invested in the most promising projects across the blockchain
            ecosystem, positioning ourselves at the forefront of Web3 innovation.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-8 bg-card border-border">
                <div className="h-12 bg-muted rounded animate-pulse mb-4" />
                <div className="h-4 bg-muted rounded w-20 mx-auto animate-pulse" />
              </Card>
            ))
          ) : (
            portfolioItems?.map((item) => (
              <a 
                key={item.id} 
                href={item.websiteUrl ?? "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid={`card-portfolio-${item.id}`}
                className="group"
              >
                <Card className="p-6 bg-card border-border hover-elevate">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold text-lg group-hover:text-gojira-red transition-colors">{item.name}</h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-muted-foreground text-sm">{item.category}</p>
                </Card>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
