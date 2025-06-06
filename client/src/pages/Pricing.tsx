import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Server, Globe, Wrench } from "lucide-react";
import { Link } from "wouter";

const mainServices = [
  {
    name: "New Website",
    price: "$999",
    description: "Complete AI-powered website from scratch",
    icon: Globe,
    features: [
      "Custom AI-powered design",
      "Up to 5 pages",
      "Mobile responsive",
      "Basic SEO optimization", 
      "Contact form integration",
      "1 month free hosting",
      "30-day revisions",
    ],
    cta: "Build New Site",
    popular: true,
  },
  {
    name: "Website Hosting",
    price: "$29/mo",
    description: "Professional managed hosting with support",
    icon: Server,
    features: [
      "99.9% uptime guarantee",
      "SSL certificate included",
      "Daily backups",
      "Security monitoring",
      "Performance optimization",
      "Technical support",
      "CDN integration",
    ],
    cta: "Start Hosting",
  },
  {
    name: "Website Redesign", 
    price: "$699",
    description: "Modernize your existing website",
    icon: Wrench,
    features: [
      "Complete design overhaul",
      "Performance optimization",
      "Mobile responsive upgrade",
      "SEO improvements",
      "Content migration",
      "1 month free hosting",
      "30-day revisions",
    ],
    cta: "Redesign Now",
  },
];

const addOns = [
  {
    name: "E-commerce Store",
    price: "$299",
    description: "Full online store with payment processing and inventory management.",
    category: "Business Features"
  },
  {
    name: "Booking System",
    price: "$199",
    description: "Appointment scheduling with calendar integration and notifications.",
    category: "Business Features"
  },
  {
    name: "Interactive Menu",
    price: "$99",
    description: "Digital menu with categories, pricing, and order management.",
    category: "Business Features"
  },
  {
    name: "Photo Gallery",
    price: "$149",
    description: "Professional image gallery with lightbox and portfolio showcase.",
    category: "Content Features"
  },
  {
    name: "Blog System",
    price: "$199",
    description: "Content management with blog functionality and SEO optimization.",
    category: "Content Features"
  },
  {
    name: "Advanced Forms",
    price: "$99",
    description: "Custom forms with email notifications and data collection.",
    category: "Content Features"
  },
  {
    name: "Social Integration",
    price: "$49",
    description: "Social media feeds, sharing buttons, and profile links.",
    category: "Marketing"
  },
  {
    name: "Analytics Dashboard",
    price: "$79",
    description: "Google Analytics integration with performance tracking.",
    category: "Marketing"
  },
  {
    name: "Advanced SEO",
    price: "$199",
    description: "Comprehensive SEO optimization with meta tags and sitemaps.",
    category: "Marketing"
  },
  {
    name: "Multi-language",
    price: "$249",
    description: "Support for multiple languages with translation management.",
    category: "Advanced"
  },
];

export default function Pricing() {
  const addonsByCategory = addOns.reduce((acc, addon) => {
    if (!acc[addon.category]) acc[addon.category] = [];
    acc[addon.category].push(addon);
    return acc;
  }, {} as Record<string, typeof addOns>);

  return (
    <>
      <Navigation />
      <div className="pt-16 bg-background min-h-screen">
        <div className="py-32 max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-mono mb-8">
              PRICING
            </p>
            <h1 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-8">
              Simple, transparent
              <br />
              <span className="text-gradient">pricing</span>
            </h1>
            <div className="border-gradient mx-auto w-24"></div>
          </div>

          {/* Main Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className={`relative bg-card border-border transition-all duration-300 hover:shadow-lg ${
                    service.popular ? "border-accent" : ""
                  }`}
                >
                  {service.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                      MOST POPULAR
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-8">
                    <div className="w-12 h-12 mx-auto mb-4 text-accent">
                      <IconComponent className="w-full h-full" />
                    </div>
                    <CardTitle className="text-lg font-mono uppercase tracking-wider text-foreground mb-4">
                      {service.name}
                    </CardTitle>
                    <div className="text-4xl font-light text-foreground mb-4">
                      {service.price}
                    </div>
                    <p className="text-muted-foreground font-light">
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-4 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/checkout">
                      <Button
                        variant="outline"
                        className="w-full border border-foreground text-foreground hover:bg-foreground hover:text-background font-mono uppercase tracking-wider text-sm py-3 minimal-hover"
                      >
                        {service.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Add-ons Section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h3 className="text-2xl font-light text-foreground mb-4">
                Available Add-ons
              </h3>
              <p className="text-muted-foreground font-light">
                Enhance your website with additional features
              </p>
            </div>

            {Object.entries(addonsByCategory).map(([category, categoryAddons]) => (
              <div key={category} className="mb-12">
                <h4 className="text-lg font-mono uppercase tracking-wider text-muted-foreground mb-6 text-center">
                  {category}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryAddons.map((addon, index) => (
                    <Card key={index} className="bg-card border-border hover:border-accent/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h5 className="font-light text-foreground">{addon.name}</h5>
                          <span className="text-lg font-mono text-accent">{addon.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-light">
                          {addon.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-card border border-border rounded-lg p-12">
            <h3 className="text-2xl font-light text-foreground mb-4">
              Ready to get started?
            </h3>
            <p className="text-muted-foreground font-light mb-8 max-w-2xl mx-auto">
              Choose your service, select add-ons, and get your professional website built by AI experts. 
              30-day money-back guarantee on all services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/checkout">
                <Button
                  variant="outline"
                  className="border border-foreground text-foreground hover:bg-foreground hover:text-background font-mono uppercase tracking-wider text-sm py-3 px-8 minimal-hover"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="ghost"
                  className="font-mono uppercase tracking-wider text-sm py-3 px-8"
                >
                  Contact for Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}