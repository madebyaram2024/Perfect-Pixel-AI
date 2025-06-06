import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Users, Globe } from "lucide-react";

export default function ValueProposition() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const benefits = [
    {
      icon: Zap,
      title: "Built Fast",
      description: "Your website delivered in 2 weeks, not months. AI accelerates our design process."
    },
    {
      icon: Globe,
      title: "Works Everywhere",
      description: "Mobile-responsive design that looks perfect on phones, tablets, and desktops."
    },
    {
      icon: Users,
      title: "Gets Results",
      description: "Designed to convert visitors into customers with proven layouts and copywriting."
    },
    {
      icon: Shield,
      title: "Always Secure",
      description: "SSL certificates, regular backups, and security updates included automatically."
    }
  ];

  return (
    <section className="py-24 bg-card/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Content */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
            Why Choose PerfectPixelAI?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We use artificial intelligence to create websites that actually work for your business. 
            No complicated jargon, no endless revisions, just professional websites that drive results.
          </p>
        </div>

        {/* Enhanced Benefits Grid with Micro-interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="group text-center border-border bg-background card-lift hover:border-accent/30 cursor-pointer animate-reveal-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8 relative overflow-hidden">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-500">
                    <benefit.icon className="w-6 h-6 text-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-3 group-hover:text-accent transition-colors duration-300">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300">{benefit.description}</p>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simple Process */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-light text-foreground mb-8">
            How It Works
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto text-lg font-medium">
                1
              </div>
              <h4 className="text-lg font-medium text-foreground">Tell Us About Your Business</h4>
              <p className="text-muted-foreground text-sm">
                Share your goals, target audience, and any specific requirements you have.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto text-lg font-medium">
                2
              </div>
              <h4 className="text-lg font-medium text-foreground">We Design & Build</h4>
              <p className="text-muted-foreground text-sm">
                Our AI creates a custom design optimized for your industry and audience.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto text-lg font-medium">
                3
              </div>
              <h4 className="text-lg font-medium text-foreground">You Get Results</h4>
              <p className="text-muted-foreground text-sm">
                Launch your professional website and start converting visitors into customers.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => window.location.href = "/checkout?service=new_website"}
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg group"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}