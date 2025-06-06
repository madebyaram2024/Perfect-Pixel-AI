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
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-purple-200/30 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-blue-700">✨ Why Choose PerfectPixelAI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Revolutionize</span> Your Online Presence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We combine cutting-edge AI technology with human creativity to deliver exceptional websites 
            that drive results at unbeatable prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 hover:bg-white/80 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              
              {/* Decorative element */}
              <div className="mt-6 w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Additional trust indicators */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Websites Delivered</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-green-600 mb-2">1-2</div>
              <div className="text-muted-foreground">Week Turnaround</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">99%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
