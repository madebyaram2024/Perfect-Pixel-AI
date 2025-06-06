import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Pricing() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const newWebsiteFeatures = [
    "Up to 5 custom pages",
    "AI-optimized, responsive design",
    "Basic SEO included",
    "You own the files",
  ];

  const modernizationFeatures = [
    "Redesign of up to 5 pages",
    "Modern, mobile-friendly updates",
    "AI enhancements",
    "You own the files",
  ];

  const addOns = [
    {
      name: "eCommerce",
      price: "$99",
      description: "Sell products with a secure online store.",
    },
    {
      name: "Blog",
      price: "$49",
      description: "Engage customers and improve SEO.",
    },
    {
      name: "Social Media Integration",
      price: "$29",
      description: "Link your site to social profiles.",
    },
    {
      name: "Custom Features",
      price: "Quoted separately",
      description: "Tailored to your needs.",
    },
  ];

  const hostingFeatures = [
    "Reliable hosting",
    "Regular backups",
    "Security updates",
    "Technical support",
  ];

  return (
    <section id="pricing" className="py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-mono mb-8">
            PRICING
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-8">
            Simple, transparent
            <br />
            <span className="text-gradient">pricing structure</span>
          </h2>
          <div className="border-gradient mx-auto w-24"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* New Website Pricing */}
          <div className="bg-card border border-border p-12 minimal-hover">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-light text-foreground">New Website</h3>
                <div className="text-5xl font-light text-foreground">$199</div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground font-mono">
                  BUILD FROM SCRATCH
                </p>
              </div>

              <div className="border-gradient w-full"></div>

              <div className="space-y-6 text-left">
                {newWebsiteFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-accent mt-3 flex-shrink-0"></div>
                    <p className="text-muted-foreground font-light">{feature}</p>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full border border-foreground text-foreground hover:bg-foreground hover:text-background font-mono uppercase tracking-wider text-sm py-3 minimal-hover"
                onClick={() => scrollToSection("contact")}
              >
                START PROJECT
              </Button>
            </div>
          </div>

          {/* Website Modernization Pricing */}
          <div className="bg-card border border-border p-12 minimal-hover">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-light text-foreground">Modernization</h3>
                <div className="text-5xl font-light text-foreground">$149</div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground font-mono">
                  REFRESH EXISTING
                </p>
              </div>

              <div className="border-gradient w-full"></div>

              <div className="space-y-6 text-left">
                {modernizationFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-accent mt-3 flex-shrink-0"></div>
                    <p className="text-muted-foreground font-light">{feature}</p>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full border border-foreground text-foreground hover:bg-foreground hover:text-background font-mono uppercase tracking-wider text-sm py-3 minimal-hover"
                onClick={() => scrollToSection("contact")}
              >
                START PROJECT
              </Button>
            </div>
          </div>
        </div>

        {/* Add-On Features */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-light text-foreground mb-4">Add-On Features</h3>
            <div className="border-gradient mx-auto w-16"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-6 border border-border minimal-hover"
              >
                <h4 className="font-medium text-foreground">{addon.name}</h4>
                <div className="text-xl font-light text-foreground">{addon.price}</div>
                <p className="text-sm text-muted-foreground font-light">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hosting Plan */}
        <div className="bg-card border border-border p-12 text-center mb-24">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-light text-foreground">Optional Hosting</h3>
              <div className="text-3xl font-light text-foreground">
                $24.99<span className="text-base font-mono text-muted-foreground">/month</span>
              </div>
              <p className="text-sm uppercase tracking-wider text-muted-foreground font-mono">
                MANAGED HOSTING SOLUTION
              </p>
            </div>

            <div className="border-gradient w-24 mx-auto"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {hostingFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-center gap-2">
                  <div className="w-1 h-1 bg-accent"></div>
                  <span className="text-sm text-muted-foreground font-light">{feature}</span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground font-light">
              Host with us or take your files anywhere—your choice.
            </p>
          </div>
        </div>

        {/* Why So Affordable */}
        <div className="text-center">
          <h3 className="text-2xl font-light text-foreground mb-6">Why So Affordable?</h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Our AI-powered design process eliminates overhead costs while maintaining 
            professional quality standards.
          </p>
        </div>
      </div>
    </section>
  );
}
