import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Smartphone, 
  Search, 
  ShoppingCart, 
  Palette, 
  BarChart3,
  Shield,
  Zap,
  ArrowRight
} from "lucide-react";

export default function ExpertiseSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const technologies = [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Framework" },
    { name: "TypeScript", category: "Language" },
    { name: "Node.js", category: "Backend" },
    { name: "WordPress", category: "CMS" },
    { name: "Shopify", category: "E-commerce" },
    { name: "AWS", category: "Cloud" },
    { name: "Google Analytics", category: "Analytics" }
  ];

  const services = [
    {
      icon: Code,
      title: "Custom Web Development",
      description: "Bespoke websites built with modern frameworks and optimized for performance, security, and scalability.",
      features: ["React/Next.js development", "Custom CMS integration", "API development", "Database design"]
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first designs that provide exceptional user experience across all devices and screen sizes.",
      features: ["Mobile optimization", "Cross-browser compatibility", "Touch-friendly interfaces", "Progressive web apps"]
    },
    {
      icon: Search,
      title: "SEO & Digital Marketing",
      description: "Comprehensive SEO strategies and digital marketing solutions to increase your online visibility.",
      features: ["Technical SEO", "Content optimization", "Local SEO", "Google Ads management"]
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Full-featured online stores with secure payment processing and inventory management systems.",
      features: ["Shopify development", "WooCommerce setup", "Payment integration", "Inventory management"]
    },
    {
      icon: Palette,
      title: "Brand Identity Design",
      description: "Complete brand identity packages including logos, color schemes, and brand guidelines.",
      features: ["Logo design", "Brand guidelines", "Marketing materials", "Social media assets"]
    },
    {
      icon: BarChart3,
      title: "Analytics & Optimization",
      description: "Data-driven insights and continuous optimization to improve website performance and conversions.",
      features: ["Google Analytics setup", "Conversion tracking", "A/B testing", "Performance monitoring"]
    }
  ];

  const industries = [
    "Healthcare & Medical",
    "Professional Services",
    "Real Estate",
    "E-commerce & Retail", 
    "Technology & SaaS",
    "Education & Training",
    "Food & Restaurant",
    "Finance & Insurance",
    "Manufacturing",
    "Non-profit Organizations"
  ];

  return (
    <section className="py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-mono mb-8">
            OUR EXPERTISE
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-8">
            Comprehensive Web Design
            <br />
            <span className="text-gradient">& Development Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From concept to launch, we provide end-to-end web solutions that help businesses 
            establish a strong online presence and achieve their digital marketing goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8 space-y-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="w-3 h-3 text-accent flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technologies Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-light text-foreground mb-4">
              Technologies We Master
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We use cutting-edge technologies and frameworks to build websites that are fast, 
              secure, and scalable for future growth.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-card border border-border hover:bg-accent/10 transition-colors px-4 py-2"
              >
                <span className="font-medium">{tech.name}</span>
                <span className="text-muted-foreground ml-2 text-xs">• {tech.category}</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Industries Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-light text-foreground mb-4">
              Industries We Serve
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered approach adapts to any industry, creating websites that resonate 
              with your specific target audience and business objectives.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {industries.map((industry, index) => (
              <div 
                key={index} 
                className="text-center p-4 border border-border rounded-lg hover:bg-card transition-colors"
              >
                <span className="text-sm text-muted-foreground font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Overview */}
        <div className="text-center">
          <h3 className="text-2xl font-light text-foreground mb-6">
            Ready to Transform Your Online Presence?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that have increased their online conversions 
            and revenue with our AI-powered web design solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("services")}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 group"
            >
              View Our Services
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-4"
            >
              Get Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}