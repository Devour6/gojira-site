import { Link } from "wouter";
import { Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6 cursor-pointer">
              <span className="text-2xl font-bold font-display tracking-tighter text-primary">
                GOJIRA
              </span>
              <span className="text-2xl font-bold font-display tracking-tighter text-white">
                HOLDINGS
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              King of the Nodes. Providing enterprise-grade blockchain infrastructure
              with unmatched uptime and security.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <a href="/#portfolio" className="text-muted-foreground hover:text-white transition-colors">Portfolio</a>
              </li>
              <li>
                <Link href="/validator" className="text-muted-foreground hover:text-white transition-colors">Validator</Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="text-muted-foreground">hello@gojira.holdings</li>
              <li className="text-muted-foreground">San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Gojira Holdings. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
