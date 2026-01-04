import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PortfolioListResponse } from "@shared/routes";

export function PortfolioSection() {
  const { data: portfolioItems, isLoading } = useQuery<PortfolioListResponse>({
    queryKey: ["/api/portfolio"],
  });

  return (
    <section id="portfolio" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-gojira-red border-gojira-red/30 bg-gojira-red/10">
            OUR INVESTMENTS
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Strategic <span className="text-gojira-red">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've strategically invested in the most promising projects across the blockchain
            ecosystem, positioning ourselves at the forefront of Web3 innovation and development.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-6 bg-card border-border hover-elevate">
                <div className="w-20 h-20 mx-auto bg-muted rounded-full animate-pulse" />
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
              >
                <Card className="p-6 bg-card border-border hover-elevate transition-transform hover:scale-[1.02] cursor-pointer">
                  <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-muted-foreground text-xs mt-1">{item.category}</p>
                  </div>
                </Card>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
