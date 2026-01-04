import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoImage from "@assets/GOJIRA_X_1767555736780.jpg";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "HOME", href: "/#hero", isScroll: true, scrollId: "hero" },
    { label: "PORTFOLIO", href: "/#portfolio", isScroll: true, scrollId: "portfolio" },
    { label: "VALIDATOR", href: "/validator", isScroll: false },
    { label: "ABOUT", href: "/#about", isScroll: true, scrollId: "about" },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setMobileMenuOpen(false);
    if (item.isScroll && item.scrollId) {
      if (location !== "/") {
        setLocation("/");
        setTimeout(() => {
          const element = document.getElementById(item.scrollId!);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.getElementById(item.scrollId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      setLocation(item.href);
    }
  };

  const handleStakeClick = () => {
    setMobileMenuOpen(false);
    if (location !== "/") {
      setLocation("/");
      setTimeout(() => {
        const element = document.getElementById("staking");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById("staking");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <img 
              src={logoImage} 
              alt="Gojira" 
              className="w-8 h-8 rounded-full"
              data-testid="img-logo"
            />
            <span className="text-lg font-bold">
              <span className="text-gojira-red">GOJIRA</span>
              <span className="text-white ml-1">HOLDINGS</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium transition-colors hover:text-white text-muted-foreground"
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="default" 
              className="bg-primary hover:bg-primary/90"
              onClick={handleStakeClick}
              data-testid="button-stake-now"
            >
              STAKE NOW
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="block text-sm font-medium text-muted-foreground hover:text-white py-2 w-full text-left"
                data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="default" 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleStakeClick}
              data-testid="button-mobile-stake-now"
            >
              STAKE NOW
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
