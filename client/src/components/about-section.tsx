import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center">
          <Badge variant="outline" className="mb-4 text-gojira-red border-gojira-red/30 bg-gojira-red/10 px-4 py-1">
            ABOUT
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Leading the <span className="text-gojira-red">Web3 Revolution</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8 leading-relaxed">
            Gojira Holdings was founded to be at the forefront of web3 innovation. We operate our flagship 
            validator — Gojira, the "King of the Nodes" — while strategically investing in promising projects 
            across the ecosystem.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-12 leading-relaxed">
            Our infrastructure is built for reliability, security, and performance. We're committed to 
            supporting the Solana network and delivering consistent returns for our stakers.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => {
              const element = document.getElementById("staking");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            data-testid="button-about-stake"
          >
            Stake With Us <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
