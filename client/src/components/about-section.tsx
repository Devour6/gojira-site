import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  const values = [
    "Technical Excellence and Reliability",
    "Transparency and Community Focus",
    "Strategic Web3 Investments",
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-gojira-red border-gojira-red/30 bg-gojira-red/10">
            ABOUT GOJIRA
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Leading the <span className="text-gojira-red">Web3 Revolution</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Gojira Holdings was founded to be at the forefront of web3 innovation. We operate our flagship 
            validator — Gojira, the "King of the Nodes" — while strategically investing in promising projects 
            across the ecosystem.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <Card className="bg-primary/10 border-primary/20 p-8 max-w-md">
            <h3 className="text-xl font-bold text-white mb-6">Our Values</h3>
            <ul className="space-y-4">
              {values.map((value, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-white">{value}</span>
                </li>
              ))}
            </ul>
          </Card>

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
