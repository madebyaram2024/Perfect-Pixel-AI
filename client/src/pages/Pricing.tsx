import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface ServicePlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

interface Addon {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

const servicePlans: ServicePlan[] = [
  {
    id: "new_website",
    name: "New Website",
    price: 999,
    description: "Complete website from scratch with modern design",
    features: [
      "Custom AI-powered design",
      "Up to 5 pages",
      "Mobile responsive",
      "Basic SEO optimization",
      "Contact form integration",
      "1 month free hosting"
    ],
    popular: true
  },
  {
    id: "redesign",
    name: "Website Redesign", 
    price: 699,
    description: "Modernize your existing website",
    features: [
      "Complete design overhaul",
      "Performance optimization",
      "Mobile responsive upgrade",
      "SEO improvements",
      "Content migration",
      "1 month free hosting"
    ]
  }
];

const hostingPlans = [
  {
    id: "managed",
    name: "Managed Hosting",
    price: 29,
    period: "monthly",
    description: "Professional hosting with maintenance",
    features: [
      "99.9% uptime guarantee",
      "SSL certificate included",
      "Daily backups",
      "Security monitoring",
      "Performance optimization",
      "Technical support"
    ],
    popular: true
  },
  {
    id: "files_only",
    name: "Files Only",
    price: 0,
    period: "one-time",
    description: "Receive website files for self-hosting",
    features: [
      "Complete website files",
      "Installation instructions",
      "Basic documentation",
      "30-day support"
    ]
  }
];

const addons: Addon[] = [
  {
    id: "ecommerce",
    name: "E-commerce Store",
    price: 299,
    description: "Full online store with payment processing",
    category: "Business Features"
  },
  {
    id: "booking",
    name: "Booking System",
    price: 199,
    description: "Appointment and reservation management",
    category: "Business Features"
  },
  {
    id: "menu",
    name: "Interactive Menu",
    price: 99,
    description: "Digital menu with categories and pricing",
    category: "Business Features"
  },
  {
    id: "gallery",
    name: "Photo Gallery",
    price: 149,
    description: "Professional image gallery with lightbox",
    category: "Content Features"
  },
  {
    id: "blog",
    name: "Blog System",
    price: 199,
    description: "Content management with blog functionality",
    category: "Content Features"
  },
  {
    id: "contact_forms",
    name: "Advanced Forms",
    price: 99,
    description: "Custom forms with email notifications",
    category: "Content Features"
  },
  {
    id: "social_media",
    name: "Social Integration",
    price: 49,
    description: "Social media feeds and sharing buttons",
    category: "Marketing"
  },
  {
    id: "analytics",
    name: "Analytics Dashboard",
    price: 79,
    description: "Google Analytics and performance tracking",
    category: "Marketing"
  },
  {
    id: "seo",
    name: "Advanced SEO",
    price: 199,
    description: "Comprehensive SEO optimization and tools",
    category: "Marketing"
  },
  {
    id: "multilingual",
    name: "Multi-language",
    price: 249,
    description: "Support for multiple languages",
    category: "Advanced"
  }
];

export default function Pricing() {
  const [selectedService, setSelectedService] = useState<string>("new_website");
  const [selectedHosting, setSelectedHosting] = useState<string>("managed");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const calculateTotal = () => {
    const servicePrice = servicePlans.find(p => p.id === selectedService)?.price || 0;
    const hostingPrice = selectedHosting === "managed" ? 29 : 0;
    const addonsPrice = selectedAddons.reduce((total, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
    
    return servicePrice + hostingPrice + addonsPrice;
  };

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const addonsByCategory = addons.reduce((acc, addon) => {
    if (!acc[addon.category]) acc[addon.category] = [];
    acc[addon.category].push(addon);
    return acc;
  }, {} as Record<string, Addon[]>);

  return (
    <div className="py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
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

        {/* Service Selection */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-foreground mb-8 text-center">Choose Your Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicePlans.map((plan) => (
              <Card 
                key={plan.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedService === plan.id 
                    ? "border-accent shadow-lg" 
                    : "border-border hover:border-accent/50"
                } ${plan.popular ? "relative" : ""}`}
                onClick={() => setSelectedService(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                    MOST POPULAR
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-light">{plan.name}</CardTitle>
                  <div className="text-3xl font-mono font-light">
                    ${plan.price}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Hosting Selection */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-foreground mb-8 text-center">Choose Hosting Option</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hostingPlans.map((plan) => (
              <Card 
                key={plan.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedHosting === plan.id 
                    ? "border-accent shadow-lg" 
                    : "border-border hover:border-accent/50"
                } ${plan.popular ? "relative" : ""}`}
                onClick={() => setSelectedHosting(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                    RECOMMENDED
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-light">{plan.name}</CardTitle>
                  <div className="text-3xl font-mono font-light">
                    ${plan.price}
                    {plan.period && <span className="text-sm text-muted-foreground">/{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add-ons Selection */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-foreground mb-8 text-center">Add-on Features</h2>
          {Object.entries(addonsByCategory).map(([category, categoryAddons]) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-mono uppercase tracking-wider text-muted-foreground mb-4">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryAddons.map((addon) => (
                  <Card 
                    key={addon.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedAddons.includes(addon.id) 
                        ? "border-accent bg-accent/5" 
                        : "border-border hover:border-accent/50"
                    }`}
                    onClick={() => handleAddonToggle(addon.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Checkbox 
                          checked={selectedAddons.includes(addon.id)}
                          onChange={() => handleAddonToggle(addon.id)}
                        />
                        <span className="font-mono text-lg">${addon.price}</span>
                      </div>
                      <h4 className="font-light text-foreground mb-2">{addon.name}</h4>
                      <p className="text-sm text-muted-foreground">{addon.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Total and CTA */}
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <div className="mb-6">
            <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-2">
              TOTAL PRICE
            </p>
            <div className="text-4xl font-mono font-light text-foreground">
              ${calculateTotal()}
              {selectedHosting === "managed" && (
                <span className="text-sm text-muted-foreground ml-2">
                  (+$29/month hosting)
                </span>
              )}
            </div>
          </div>
          
          <Link href="/checkout">
            <Button 
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-mono uppercase tracking-wider"
            >
              GET STARTED
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground mt-4">
            30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
}