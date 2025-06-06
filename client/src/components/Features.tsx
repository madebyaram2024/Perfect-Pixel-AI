import { DollarSign, Zap, Smartphone, Brain } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: DollarSign,
      title: "Affordable Pricing",
      description: "High-quality websites starting at $149.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      description: "Launch your site quickly with our AI-driven process.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Smartphone,
      title: "Modern Designs",
      description: "Responsive, mobile-friendly layouts that impress.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Brain,
      title: "AI-Optimized",
      description: "Enhanced performance and search engine visibility.",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <section className="py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-mono mb-8">
            WHY CHOOSE US
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-8">
            Professional web design
            <br />
            <span className="text-gradient">powered by AI</span>
          </h2>
          <div className="border-gradient mx-auto w-24 mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            We combine artificial intelligence with human expertise to deliver 
            exceptional websites at affordable prices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center space-y-6 minimal-hover"
            >
              <div className="w-12 h-12 bg-card border border-border flex items-center justify-center mx-auto">
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-32 pt-16 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-light text-foreground">100+</div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground font-mono">
                WEBSITES DELIVERED
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-light text-foreground">1-2</div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground font-mono">
                WEEK TURNAROUND
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-light text-foreground">99%</div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground font-mono">
                CLIENT SATISFACTION
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
