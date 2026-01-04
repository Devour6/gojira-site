import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Validator", href: "/validator" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
            <span className="text-3xl font-bold font-display tracking-tighter text-primary group-hover:text-glow transition-all duration-300">
              GOJIRA
            </span>
            <span className="text-3xl font-bold font-display tracking-tighter text-white">
              HOLDINGS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                  location === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
            <a
              href="/validator"
              className="px-6 py-2 bg-primary text-white font-bold font-display uppercase tracking-wide rounded-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Stake Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-md"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background border-b border-white/5"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-white hover:bg-white/5 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="/validator"
              className="block w-full text-center mt-4 px-6 py-3 bg-primary text-white font-bold uppercase rounded-sm"
              onClick={() => setIsOpen(false)}
            >
              Stake Now
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
