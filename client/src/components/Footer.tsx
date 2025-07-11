import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-6">
            <h3 className="text-lg font-mono tracking-wider text-foreground mb-6">PERFECT<span className="text-accent">PIXEL</span>AI</h3>
            <p className="text-muted-foreground font-light leading-relaxed max-w-md mb-6">
              Professional AI-powered web design for modern businesses. 
              Affordable, fast, and tailored to your needs.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                FOLLOW US
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/perfectpixelaisocial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-border hover:bg-accent/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <Facebook className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </a>
                <a
                  href="https://www.instagram.com/perfect_pixel_ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-border hover:bg-accent/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </a>
                <a
                  href="https://x.com/perfectpixelai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-border hover:bg-accent/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-6">
              SERVICES
            </h4>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-foreground font-light hover:text-accent transition-colors minimal-hover"
                >
                  New Websites
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-foreground font-light hover:text-accent transition-colors minimal-hover"
                >
                  Modernization
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-foreground font-light hover:text-accent transition-colors minimal-hover"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-6">
              COMPANY
            </h4>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="text-foreground font-light hover:text-accent transition-colors minimal-hover"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-foreground font-light hover:text-accent transition-colors minimal-hover"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-foreground font-light hover:text-accent transition-colors minimal-hover"
                >
                  Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-gradient w-full mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-mono">
            © 2024 PERFECTPIXELAI. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors minimal-hover"
            >
              BACK TO TOP
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
