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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We combine AI technology with human creativity to deliver exceptional websites at unbeatable prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
