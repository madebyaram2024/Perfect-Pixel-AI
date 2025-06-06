import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Star } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="absolute inset-0 noise-bg opacity-20"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Trust Badge */}
        <div className="flex justify-center mb-8">
          <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-2">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Go Live In 7 Days
          </Badge>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-light leading-[0.85] mb-8 tracking-tight">
          <span className="text-foreground">Get A Professional</span>
          <br />
          <span className="text-gradient">Website That Works</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          AI-powered web design that converts visitors into customers. 
          No technical knowledge required. Fast delivery guaranteed.
        </p>

        {/* Key Benefits */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-accent" />
            <span>Mobile Responsive</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-accent" />
            <span>SEO Optimized</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-accent" />
            <span>7-Day Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-accent" />
            <span>30-Day Revisions</span>
          </div>
        </div>

        {/* Pricing Display */}
        <div className="mb-12">
          <div className="text-4xl md:text-5xl font-light text-foreground mb-2">
            Starting at <span className="text-accent">$449</span>
          </div>
          <p className="text-muted-foreground">
            Website redesigns • New websites from $499 • Hosting from $25/mo
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            onClick={() => scrollToSection("services")}
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg group"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("portfolio")}
            className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-4 text-lg"
          >
            View Our Work
          </Button>
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Professional websites that actually work for your business
          </p>
        </div>
      </div>
    </section>
  );
}