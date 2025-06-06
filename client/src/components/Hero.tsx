import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, Users, Globe, Zap, Shield, TrendingUp } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    { number: "500+", label: "Websites Built", icon: Globe },
    { number: "98%", label: "Client Satisfaction", icon: Star },
    { number: "24hrs", label: "Avg Response Time", icon: Zap },
    { number: "99.9%", label: "Uptime Guarantee", icon: Shield }
  ];

  const benefits = [
    {
      title: "AI-Powered Design Intelligence",
      description: "Our proprietary AI analyzes thousands of high-converting websites to create designs that drive results for your specific industry and target audience."
    },
    {
      title: "SEO-Optimized from Day One",
      description: "Every website is built with advanced SEO strategies, including schema markup, optimized page speed, and content structure that ranks higher in search engines."
    },
    {
      title: "Mobile-First Responsive Design",
      description: "With 60% of web traffic coming from mobile devices, our AI ensures your website looks perfect and performs flawlessly on every screen size."
    },
    {
      title: "Performance & Security Built-In",
      description: "Lightning-fast loading speeds, SSL encryption, and advanced security measures protect your business and provide exceptional user experience."
    }
  ];

  return (
    <section 
      id="home" 
      className="relative bg-background"
    >
      {/* Hero Section */}
      <div className="min-h-screen flex items-center grid-pattern noise-bg">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-32">
          <div className="text-center space-y-12 animate-fade-in-up">
            {/* Trust Indicators */}
            <div className="flex justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-accent/20 text-accent font-mono text-xs">
                AI-POWERED
              </Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-green-500 font-mono text-xs">
                SEO OPTIMIZED
              </Badge>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-500 font-mono text-xs">
                MOBILE FIRST
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-mono">
                  PROFESSIONAL WEB DESIGN SERVICES
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[0.9] tracking-tight">
                  <span className="text-gradient">AI-Powered Websites</span>
                  <br />
                  <span className="text-foreground">That Drive Results</span>
                </h1>
              </div>
              
              <div className="border-gradient mx-auto w-24"></div>
              
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  Transform your online presence with professional websites built using cutting-edge AI technology. 
                  From small businesses to enterprises, we create websites that convert visitors into customers.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    Increase conversions by 40%
                  </span>
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    2-week delivery
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    500+ satisfied clients
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-medium group"
                  onClick={() => scrollToSection("services")}
                >
                  Get Your Website Built
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-4 text-lg font-mono"
                  onClick={() => scrollToSection("portfolio")}
                >
                  VIEW PORTFOLIO
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Starting at <span className="text-accent font-medium text-lg">$149</span> • 
                Free consultation • 30-day revisions included
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="flex justify-center">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="text-3xl font-light text-foreground">{stat.number}</div>
                <div className="text-sm text-muted-foreground font-mono uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
              Why Choose AI-Powered Web Design?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Artificial intelligence revolutionizes web design by analyzing user behavior patterns, 
              conversion data, and design trends to create websites that perform better than traditional methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-medium text-foreground mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="py-32 bg-card/30 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-light text-foreground mb-8 text-center">
              Professional Web Design Services That Deliver Results
            </h2>
            
            <div className="space-y-8 text-muted-foreground">
              <div>
                <h3 className="text-xl font-medium text-foreground mb-4">Modern Web Design for Growing Businesses</h3>
                <p className="leading-relaxed">
                  In today's digital landscape, your website is often the first interaction potential customers have with your business. 
                  Our AI-powered web design services combine cutting-edge technology with proven design principles to create websites 
                  that not only look stunning but also drive measurable business results.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-foreground mb-4">Comprehensive Website Development Solutions</h3>
                <p className="leading-relaxed">
                  Whether you need a complete website redesign, a brand new business website, or reliable hosting services, 
                  our team delivers professional solutions tailored to your specific industry and target audience. Every project 
                  includes responsive design, search engine optimization, and performance optimization to ensure your website 
                  ranks well in Google and converts visitors into customers.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-foreground mb-4">AI Technology Meets Human Creativity</h3>
                <p className="leading-relaxed">
                  Our proprietary AI technology analyzes thousands of high-performing websites to identify design patterns 
                  and user experience elements that drive conversions. This data-driven approach, combined with our creative 
                  expertise, ensures your website outperforms competitors and delivers exceptional ROI for your marketing investment.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-foreground mb-4">Complete Digital Solutions Under One Roof</h3>
                <p className="leading-relaxed">
                  From initial consultation to ongoing maintenance, we provide end-to-end web design services including 
                  custom development, content management systems, e-commerce integration, and digital marketing support. 
                  Our transparent pricing and fast turnaround times make professional web design accessible for businesses 
                  of all sizes.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4"
              >
                Start Your Project Today
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}