import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, RotateCcw, Plus, Server } from "lucide-react";

export default function Services() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: RotateCcw,
      title: "Website Redesign",
      price: "$149",
      description: "Give your existing website a modern makeover that converts better",
      features: [
        "Up to 5 pages redesigned",
        "Mobile-responsive updates", 
        "Speed optimization",
        "Modern design trends",
        "SEO improvements"
      ],
      cta: "Redesign My Website",
      popular: false
    },
    {
      icon: Plus,
      title: "New Website",
      price: "$199",
      description: "Complete custom website built from scratch for your business",
      features: [
        "Up to 5 custom pages",
        "Professional copywriting",
        "Contact forms & features",
        "SEO foundation setup",
        "30-day revision period"
      ],
      cta: "Build New Website",
      popular: true
    },
    {
      icon: Server,
      title: "Website Hosting",
      price: "$24.99/mo",
      description: "Reliable hosting with security, backups, and maintenance included",
      features: [
        "99.9% uptime guarantee",
        "SSL security certificate",
        "Daily automated backups",
        "Regular security updates",
        "24/7 technical support"
      ],
      cta: "Start Hosting",
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
            Choose Your Website Solution
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you need a fresh design, a brand new website, or reliable hosting, 
            we have the perfect solution for your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`relative border-border hover:shadow-lg transition-all duration-300 ${
                service.popular ? 'border-accent shadow-lg scale-105' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-accent-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-8 space-y-6">
                {/* Service Icon & Title */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-2">{service.title}</h3>
                  <div className="text-3xl font-light text-foreground mb-3">{service.price}</div>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className={`w-full group ${
                      service.popular 
                        ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 space-y-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-medium text-foreground mb-4">
              Not sure which option is right for you?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our AI-powered chatbot can help recommend the perfect solution based on your specific needs and budget.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="border-foreground text-foreground hover:bg-foreground hover:text-background px-6 py-3"
            >
              Get Free Consultation
            </Button>
            <Button
              onClick={() => {
                // Trigger chatbot to open with service recommendation flow
                const chatButton = document.querySelector('[data-chatbot-trigger]') as HTMLElement;
                if (chatButton) chatButton.click();
              }}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3"
            >
              Ask Our AI Assistant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}