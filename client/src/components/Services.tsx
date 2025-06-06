import { Plus, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Services() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const newWebsiteFeatures = [
    "Up to 5 custom pages",
    "Responsive design for all devices",
    "Basic SEO optimization",
    "Standard features (contact forms, galleries)",
  ];

  const modernizationFeatures = [
    "Redesign of up to 5 pages",
    "Content updates",
    "Mobile-friendly enhancements",
    "AI-powered improvements",
  ];

  const processSteps = [
    {
      number: 1,
      title: "Consultation",
      description: "We discuss your goals and vision.",
    },
    {
      number: 2,
      title: "Design",
      description: "Our AI generates tailored design options.",
    },
    {
      number: 3,
      title: "Feedback",
      description: "You review and refine with us.",
    },
    {
      number: 4,
      title: "Launch",
      description: "Your new site goes live!",
    },
  ];

  const addOns = [
    { name: "eCommerce", price: "$99", description: "Add an online store" },
    { name: "Blog", price: "$49", description: "Share updates and boost SEO" },
    { name: "Social Integration", price: "$29", description: "Connect your profiles" },
    { name: "Custom Features", price: "Quote", description: "Need something unique?" },
  ];

  return (
    <section id="services" className="py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-mono mb-8">
            SERVICES
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-8">
            AI-driven web design
            <br />
            <span className="text-gradient">for modern businesses</span>
          </h2>
          <div className="border-gradient mx-auto w-24"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* New Website Service */}
          <div className="bg-card border border-border p-12 minimal-hover">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-light text-foreground mb-2">New Website</h3>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground font-mono">
                    BUILD FROM SCRATCH
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-light text-foreground">$199</div>
                </div>
              </div>

              <div className="border-gradient w-full"></div>

              <div className="space-y-6">
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

          {/* Website Modernization Service */}
          <div className="bg-card border border-border p-12 minimal-hover">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-light text-foreground mb-2">Modernization</h3>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground font-mono">
                    REFRESH EXISTING
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-light text-foreground">$149</div>
                </div>
              </div>

              <div className="border-gradient w-full"></div>

              <div className="space-y-6">
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

        {/* Process Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-light text-foreground mb-4">Our Process</h3>
            <div className="border-gradient mx-auto w-16"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-12 h-12 border border-border bg-card flex items-center justify-center mx-auto font-mono text-sm">
                  {step.number.toString().padStart(2, '0')}
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">{step.title}</h4>
                  <p className="text-sm text-muted-foreground font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add-On Features */}
        <div className="text-center">
          <h3 className="text-2xl font-light text-foreground mb-4">Add-On Features</h3>
          <div className="border-gradient mx-auto w-16 mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {addOns.map((addon, index) => (
              <div key={index} className="text-center space-y-4 p-6 border border-border minimal-hover">
                <h4 className="font-medium text-foreground">{addon.name}</h4>
                <div className="text-xl font-light text-foreground">{addon.price}</div>
                <p className="text-sm text-muted-foreground font-light">{addon.description}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground font-light">
            With PerfectPixelAI, you own your website files—host with us or anywhere you choose.
          </p>
        </div>
      </div>
    </section>
  );
}
