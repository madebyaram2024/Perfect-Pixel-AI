import { Plus, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Services() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const newWebsiteFeatures = [
    "Up to 5 custom pages",
    "Responsive design for all devices",
    "Basic SEO optimization",
    "Standard features (contact forms, galleries)",
  ];

  const modernizationFeatures = [
    "Redesign of up to 5 pages",
    "Content updates",
    "Mobile-friendly enhancements",
    "AI-powered improvements",
  ];

  const processSteps = [
    {
      number: 1,
      title: "Consultation",
      description: "We discuss your goals and vision.",
    },
    {
      number: 2,
      title: "Design",
      description: "Our AI generates tailored design options.",
    },
    {
      number: 3,
      title: "Feedback",
      description: "You review and refine with us.",
    },
    {
      number: 4,
      title: "Launch",
      description: "Your new site goes live!",
    },
  ];

  const addOns = [
    { name: "eCommerce", price: "$99", description: "Add an online store" },
    { name: "Blog", price: "$49", description: "Share updates and boost SEO" },
    { name: "Social Integration", price: "$29", description: "Connect your profiles" },
    { name: "Custom Features", price: "Quote", description: "Need something unique?" },
  ];

  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our AI-Driven Web Design Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We specialize in creating and modernizing websites using cutting-edge AI technology.
            Perfect for small businesses, startups, and freelancers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* New Website Service */}
          <Card className="service-card bg-card shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Build a New Website</h3>
                  <p className="text-3xl font-bold text-primary">$199</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Need a website fast? Our AI website builder crafts custom, up to 5-page websites tailored to your brand.
              </p>

              <h4 className="font-semibold text-foreground mb-4">What's Included:</h4>
              <ul className="space-y-3 mb-6">
                {newWebsiteFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-muted-foreground mb-6">
                <strong>Perfect For:</strong> New businesses wanting an affordable website design.
              </p>
              <Button
                className="w-full"
                onClick={() => scrollToSection("contact")}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Website Modernization Service */}
          <Card className="service-card bg-card shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <RotateCcw className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Modernize Your Website</h3>
                  <p className="text-3xl font-bold text-green-600">$149</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Have an outdated site? We'll take your existing content, refresh the design, and add modern features.
              </p>

              <h4 className="font-semibold text-foreground mb-4">What's Included:</h4>
              <ul className="space-y-3 mb-6">
                {modernizationFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-muted-foreground mb-6">
                <strong>Perfect For:</strong> Businesses needing a modern, updated web presence.
              </p>
              <Button
                variant="secondary"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => scrollToSection("contact")}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Process Section */}
        <Card className="bg-card shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">Our Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">{step.number}</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Add-On Features */}
        <Card className="bg-card shadow-lg p-8">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">Add-On Features</h3>
          <p className="text-center text-muted-foreground mb-8">Enhance your site with optional extras:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="text-center p-4 border border-border rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">{addon.name}</h4>
                <p className="text-2xl font-bold text-primary mb-2">{addon.price}</p>
                <p className="text-sm text-muted-foreground">{addon.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-lg font-semibold text-foreground">
              With PerfectPixelAI, you own your website files—host with us or anywhere you choose!
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
