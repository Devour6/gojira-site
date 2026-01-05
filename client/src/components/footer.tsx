import { SiDiscord, SiX } from "react-icons/si";
import { useState } from "react";
import logoImage from "@assets/GOJIRA_X_1767555736780.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Footer() {
  const [tosOpen, setTosOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

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
                href="https://x.com/gojiraholdings" 
                target="_blank"
                rel="noopener noreferrer"
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
                <button 
                  onClick={() => setTosOpen(true)}
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                  data-testid="button-tos"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setPrivacyOpen(true)}
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                  data-testid="button-privacy"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <a 
                  href="mailto:brandon@gojira.holdings" 
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                  data-testid="link-contact"
                >
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
            © 2025 Gojira Holdings. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Built for the future of Web3
          </p>
        </div>
      </div>

      <Dialog open={tosOpen} onOpenChange={setTosOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Terms of Service</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4 text-sm text-muted-foreground">
              <p className="text-xs">Effective Date: 03/22/25</p>
              
              <p>Welcome to Gojira Holdings. By accessing our website ("Site") or using any of our services, you agree to the following Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Site.</p>
              
              <h3 className="text-white font-semibold pt-2">1. Use of the Site</h3>
              <p>You agree to use the Site for informational purposes only. You may not use the Site for any unlawful or prohibited activities. Gojira Holdings reserves the right to restrict or terminate your access to the Site at any time, without notice.</p>
              
              <h3 className="text-white font-semibold pt-2">2. No Financial Advice</h3>
              <p>The content provided on this Site is for informational purposes only and should not be construed as financial, investment, legal, or tax advice. Always do your own research before making any decisions regarding staking or investments.</p>
              
              <h3 className="text-white font-semibold pt-2">3. Staking Information</h3>
              <p>Staking with Gojira Holdings' validator is completely non-custodial. You retain full control over your SOL at all times. Any references to staking are not guarantees of earnings or performance. Validator performance may vary and past performance does not guarantee future results. Staking with Gojira Holdings does not grant any ownership rights, voting power, or equity in Gojira Holdings or any projects it has invested in.</p>
              
              <h3 className="text-white font-semibold pt-2">4. Investments and Projects</h3>
              <p>Information about projects Gojira Holdings has invested in is provided for transparency and informational purposes only. We are not soliciting investments or offering securities through this Site. No content on this Site should be interpreted to imply that staking or interacting with Gojira Holdings results in financial interest, partial ownership, or any rights over these investments.</p>
              
              <h3 className="text-white font-semibold pt-2">5. Intellectual Property</h3>
              <p>All content on the Site, including text, graphics, logos, and images, is the property of Gojira Holdings and is protected by copyright and trademark laws. You may not reproduce or use any content without our prior written consent.</p>
              
              <h3 className="text-white font-semibold pt-2">6. Limitation of Liability</h3>
              <p>Gojira Holdings shall not be liable for any damages resulting from the use or inability to use the Site, or for any errors or omissions in the content. All information is provided "as is."</p>
              
              <h3 className="text-white font-semibold pt-2">7. Modifications to the Terms</h3>
              <p>We reserve the right to modify these Terms at any time. Any changes will be posted on this page with an updated effective date. Continued use of the Site constitutes your acceptance of the modified Terms.</p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Privacy Policy</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4 text-sm text-muted-foreground">
              <p className="text-xs">Effective Date: 03/21/25</p>
              
              <p>Gojira Holdings respects your privacy. This Privacy Policy outlines how we collect, use, and protect any information you may provide while using our Site.</p>
              
              <h3 className="text-white font-semibold pt-2">1. Information We Collect</h3>
              <p>We do not collect any personal data unless you explicitly connect your wallet to stake SOL through our platform. The Site does not automatically pull or store user data. We may collect anonymized website analytics data (e.g., via cookies) strictly to improve user experience.</p>
              
              <h3 className="text-white font-semibold pt-2">2. How We Use Your Information</h3>
              <p>We use collected data to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Facilitate staking functionality if a wallet is connected.</li>
                <li>Respond to inquiries or support requests.</li>
                <li>Improve the functionality and user experience of our Site.</li>
                <li>Communicate with you only if you opt in.</li>
              </ul>
              
              <h3 className="text-white font-semibold pt-2">3. Data Protection</h3>
              <p>We implement standard security practices to protect your information. However, no method of transmission over the internet is completely secure.</p>
              
              <h3 className="text-white font-semibold pt-2">4. Sharing of Information</h3>
              <p>We do not sell or rent your personal data. We may share data with trusted third-party tools (e.g., analytics platforms) strictly for operational purposes.</p>
              
              <h3 className="text-white font-semibold pt-2">5. Your Rights</h3>
              <p>You may contact us at any time to request access, correction, or deletion of your data.</p>
              
              <h3 className="text-white font-semibold pt-2">6. Identity Protection</h3>
              <p>Gojira Holdings is committed to maintaining operational privacy and discretion. We do not publicly disclose ownership or internal identity-related information about our team or infrastructure.</p>
              
              <h3 className="text-white font-semibold pt-2">7. Changes to This Policy</h3>
              <p>We may update this Privacy Policy occasionally. All updates will be posted on this page with a new effective date.</p>
              
              <h3 className="text-white font-semibold pt-2">Contact</h3>
              <p>For questions about our Terms or Privacy Policy, please contact us in our twitter DM's</p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
