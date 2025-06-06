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
    <section id="pricing" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We offer affordable website design and modernization with no hidden costs.
            Our AI technology keeps prices low and quality high.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* New Website Pricing */}
          <Card className="bg-card shadow-lg border-2 border-primary">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-foreground mb-2">New Website</h3>
                <div className="text-6xl font-bold text-primary mb-2">$199</div>
                <p className="text-muted-foreground">Perfect for new businesses</p>
              </div>

              <ul className="space-y-4 mb-8">
                {newWebsiteFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                size="lg"
                onClick={() => scrollToSection("contact")}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Website Modernization Pricing */}
          <Card className="bg-card shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-foreground mb-2">Website Modernization</h3>
                <div className="text-6xl font-bold text-green-600 mb-2">$149</div>
                <p className="text-muted-foreground">Perfect for existing businesses</p>
              </div>

              <ul className="space-y-4 mb-8">
                {modernizationFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="secondary"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
                onClick={() => scrollToSection("contact")}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Add-On Features */}
        <Card className="bg-card shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">Add-On Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-foreground mb-2">{addon.name}</h4>
                <p className="text-3xl font-bold text-primary mb-3">{addon.price}</p>
                <p className="text-muted-foreground">{addon.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Hosting Plan */}
        <Card className="bg-gradient-to-r from-primary to-secondary shadow-lg p-8 text-primary-foreground text-center mb-16">
          <h3 className="text-2xl font-bold mb-4">Optional Hosting Plan</h3>
          <div className="text-4xl font-bold mb-2">
            $24.99<span className="text-lg font-normal">/month</span>
          </div>
          <p className="mb-6">Let us handle the technical stuff</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {hostingFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-center">
                <Check className="w-5 h-5 mr-2" />
                {feature}
              </div>
            ))}
          </div>

          <p className="text-blue-100">
            Take your site anywhere or let us host it for you—your choice!
          </p>
        </Card>

        {/* Why So Affordable */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Why So Affordable?</h3>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Our AI-powered web design process cuts time and costs, delivering small business websites
            that compete with expensive custom builds.
          </p>
        </div>
      </div>
    </section>
  );
}
