import { SiDiscord, SiX } from "react-icons/si";
import logoImage from "@assets/GOJIRA_X_1767555736780.jpg";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border py-16 px-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <img 
                  src={logoImage} 
                  alt="Gojira" 
                  className="w-10 h-10 rounded-full border border-primary/30"
                />
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-md -z-10" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-gojira-red">GOJIRA</span>
                <span className="text-white ml-1">HOLDINGS</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Powering Web3 innovation through validator infrastructure and strategic investments.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                data-testid="link-twitter"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                data-testid="link-discord"
              >
                <SiDiscord className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection("hero")} 
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("staking")} 
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  Staking
                </button>
              </li>
              <li>
                <a href="/validator" className="text-muted-foreground hover:text-white transition-colors text-sm">
                  Validator
                </a>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("portfolio")} 
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  Portfolio
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Start Earning</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Join the King of the Nodes and start earning rewards today.
            </p>
            <button 
              onClick={() => scrollToSection("staking")}
              className="inline-flex items-center gap-2 text-gojira-red hover:underline text-sm font-medium"
              data-testid="button-footer-stake"
            >
              Stake Now
              <span className="text-lg">&rarr;</span>
            </button>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Gojira Holdings. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Built for the future of Web3
          </p>
        </div>
      </div>
    </footer>
  );
}
