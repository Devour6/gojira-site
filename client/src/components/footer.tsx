import logoImage from "@assets/GOJIRA_X_1767555736780.jpg";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={logoImage} 
                alt="Gojira" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-lg font-bold">
                <span className="text-gojira-red">GOJIRA</span>
                <span className="text-white ml-1">HOLDINGS</span>
              </span>
            </div>
            <div className="w-8 h-0.5 bg-primary mb-4" />
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection("staking")} 
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Staking
                </button>
              </li>
              <li>
                <a href="/validator" className="text-muted-foreground hover:text-white transition-colors">
                  Validator
                </a>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("portfolio")} 
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("about")} 
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="text-right">
            <p className="text-muted-foreground text-sm mb-2">King of the Nodes</p>
            <button 
              onClick={() => scrollToSection("staking")}
              className="text-gojira-red hover:underline text-sm inline-flex items-center gap-1"
            >
              Stake Now
            </button>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center md:text-left">
          <p className="text-muted-foreground text-sm">
            © 2026 Gojira Holdings. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
