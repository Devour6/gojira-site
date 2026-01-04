import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Target, Users, Rocket } from "lucide-react";

export function AboutSection() {
  const values = [
    { icon: Target, title: "Technical Excellence", desc: "Enterprise-grade infrastructure with 99.9% uptime" },
    { icon: Users, title: "Community Focus", desc: "Transparent operations and dedicated support" },
    { icon: Rocket, title: "Strategic Vision", desc: "Investing in the future of Web3" },
  ];

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-gojira-red border-gojira-red/30 bg-gojira-red/10 px-4 py-1">
            ABOUT GOJIRA
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Leading the <span className="text-gojira-red text-glow-red">Web3 Revolution</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Gojira Holdings was founded to be at the forefront of web3 innovation. We operate our flagship 
            validator — Gojira, the "King of the Nodes" — while strategically investing in promising projects 
            across the ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {values.map((value, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border-border/50 p-8 card-glow"
            >
              <div className="w-14 h-14 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <value.icon className="w-7 h-7 text-gojira-red" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.desc}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 glow-red-sm"
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
