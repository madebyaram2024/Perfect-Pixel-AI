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
      name: "E-commerce Store",
      price: "$299",
      description: "Full online store with payment processing and inventory management.",
    },
    {
      name: "Booking System",
      price: "$199",
      description: "Appointment scheduling with calendar integration and notifications.",
    },
    {
      name: "Interactive Menu",
      price: "$99",
      description: "Digital menu with categories, pricing, and order management.",
    },
    {
      name: "Photo Gallery",
      price: "$149",
      description: "Professional image gallery with lightbox and portfolio showcase.",
    },
    {
      name: "Blog System",
      price: "$199",
      description: "Content management with blog functionality and SEO optimization.",
    },
    {
      name: "Advanced Forms",
      price: "$99",
      description: "Custom forms with email notifications and data collection.",
    },
    {
      name: "Social Integration",
      price: "$49",
      description: "Social media feeds, sharing buttons, and profile links.",
    },
    {
      name: "Analytics Dashboard",
      price: "$79",
      description: "Google Analytics integration with performance tracking.",
    },
    {
      name: "Advanced SEO",
      price: "$199",
      description: "Comprehensive SEO optimization with meta tags and sitemaps.",
    },
    {
      name: "Multi-language",
      price: "$249",
      description: "Support for multiple languages with translation management.",
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

        {/* Main Service Cards - 3 Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {/* Website Redesign */}
          <Card className="bg-card border-border transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-mono uppercase tracking-wider text-foreground">Website Redesign</h3>
                <div className="text-4xl font-light text-foreground">$199</div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground font-mono">
                  REFRESH EXISTING
                </p>
              </div>

              <div className="border-gradient w-full"></div>

              <div className="space-y-4 text-left">
                {modernizationFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground font-light">{feature}</p>
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground font-light">Performance optimization</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border border-foreground text-foreground hover:bg-foreground hover:text-background font-mono uppercase tracking-wider text-sm py-3 minimal-hover"
                onClick={() => scrollToSection("contact")}
              >
                REDESIGN NOW
              </Button>
            </CardContent>
          </Card>

          {/* New Website - Most Popular */}
          <Card className="bg-card border-accent transition-all duration-300 hover:shadow-lg relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-accent text-accent-foreground px-3 py-1 text-xs font-mono uppercase tracking-wider">
                MOST POPULAR
              </span>
            </div>
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-mono uppercase tracking-wider text-foreground">New Website</h3>
                <div className="text-4xl font-light text-foreground">$199</div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground font-mono">
                  COMPLETE BUILD
                </p>
              </div>

              <div className="border-gradient w-full"></div>

              <div className="space-y-4 text-left">
                {newWebsiteFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground font-light">{feature}</p>
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground font-light">1 month free hosting</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border border-foreground text-foreground hover:bg-foreground hover:text-background font-mono uppercase tracking-wider text-sm py-3 minimal-hover"
                onClick={() => scrollToSection("contact")}
              >
                BUILD NEW SITE
              </Button>
            </CardContent>
          </Card>

          {/* Website Hosting */}
          <Card className="bg-card border-border transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-mono uppercase tracking-wider text-foreground">Website Hosting</h3>
                <div className="text-4xl font-light text-foreground">$29<span className="text-lg">/mo</span></div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground font-mono">
                  MANAGED HOSTING
                </p>
              </div>

              <div className="border-gradient w-full"></div>

              <div className="space-y-4 text-left">
                {hostingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground font-light">{feature}</p>
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground font-light">99.9% uptime guarantee</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground font-light">SSL certificate included</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border border-foreground text-foreground hover:bg-foreground hover:text-background font-mono uppercase tracking-wider text-sm py-3 minimal-hover"
                onClick={() => scrollToSection("contact")}
              >
                START HOSTING
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Add-On Features */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-light text-foreground mb-4">Add-On Features</h3>
            <p className="text-muted-foreground font-light mb-6">
              Enhance your website with additional functionality
            </p>
            <div className="border-gradient mx-auto w-16"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="bg-card border border-border p-6 hover:border-accent/50 transition-colors minimal-hover"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-light text-foreground">{addon.name}</h4>
                  <span className="text-lg font-mono text-accent">{addon.price}</span>
                </div>
                <p className="text-sm text-muted-foreground font-light">{addon.description}</p>
              </div>
            ))}
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
