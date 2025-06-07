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
      price: "$449",
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
      price: "$499",
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
      price: "$25/mo",
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
    <section id="services-section" className="py-24 bg-background">
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
              className={`group relative border-border hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                service.popular ? 'border-accent shadow-lg scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
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
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{service.title}</h3>
                  <div className="text-3xl font-light text-foreground mb-3 group-hover:text-accent transition-colors duration-300">{service.price}</div>
                  <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">{service.description}</p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex} 
                      className="flex items-start gap-3 group/feature opacity-80 group-hover:opacity-100 transition-all duration-300"
                      style={{ transitionDelay: `${featureIndex * 50}ms` }}
                    >
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0 group-hover/feature:scale-125 transition-transform duration-200"></div>
                      <span className="text-muted-foreground text-sm group-hover/feature:text-foreground transition-colors duration-200">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Button
                    onClick={() => {
                      const serviceParam = service.title === "Website Redesign" ? "redesign" : 
                                         service.title === "New Website" ? "new_website" : "hosting";
                      window.location.href = `/checkout?service=${serviceParam}`;
                    }}
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

        {/* Additional Info with Yellow Background */}
        <div className="relative -mx-6 mt-40">
          <div className="bg-gradient-to-b from-accent to-accent/90 px-6 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-xl font-medium text-accent-foreground mb-4">
                Not sure which option is right for you?
              </h3>
              <p className="text-accent-foreground/80 mb-8">
                Our AI-powered chatbot can help recommend the perfect solution based on your specific needs and budget.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = "/checkout?service=new_website"}
                  className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-6 py-3"
                >
                  Buy Now
                </Button>
                <Button
                  onClick={() => {
                    // Trigger chatbot to open with service recommendation flow
                    const chatButton = document.querySelector('[data-chatbot-trigger]') as HTMLElement;
                    if (chatButton) chatButton.click();
                  }}
                  variant="outline"
                  className="border-2 border-black text-black hover:bg-black hover:text-white px-6 py-3 bg-transparent"
                >
                  Ask Our AI Assistant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}