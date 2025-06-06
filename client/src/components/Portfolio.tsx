import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Portfolio() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const portfolioItems = [
    {
      title: "Sweet Treats Bakery",
      description: "A delightful 5-page site with a menu, contact form, and online ordering.",
      testimonial: "PerfectPixelAI gave us a beautiful website that our customers love!",
      author: "Jane Doe, Owner",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    },
    {
      title: "John Smith Photography",
      description: "A sleek portfolio site with a blog to showcase stunning visuals.",
      testimonial: "The AI process was fast, and the result was beyond my expectations.",
      author: "John Smith",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    },
    {
      title: "GreenLeaf Landscaping",
      description: "A modernized 5-page site updated from an old design, now mobile-friendly.",
      testimonial: "Our revamped site looks amazing and works perfectly!",
      author: "Mark Lee, Manager",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    },
  ];

  return (
    <section id="portfolio" className="py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-mono mb-8">
            SELECTED WORK
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-8">
            Recent projects showcase
            <br />
            <span className="text-gradient">our AI capabilities</span>
          </h2>
          <div className="border-gradient mx-auto w-24"></div>
        </div>

        <div className="space-y-24">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group minimal-hover"
            >
              <div className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="bg-card border border-border overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.title} website`}
                    className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              
              <div className={`lg:col-span-5 space-y-6 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="space-y-4">
                  <h3 className="text-2xl font-light text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                <div className="border-l border-border pl-6 space-y-3">
                  <p className="text-foreground font-light italic">
                    "{item.testimonial}"
                  </p>
                  <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider">
                    {item.author}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  <div className="w-1 h-1 bg-accent"></div>
                  <span>LIVE PROJECT</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-32 pt-16 border-t border-border">
          <h3 className="text-2xl font-light text-foreground mb-8">
            Ready to start your project?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="border border-foreground text-foreground hover:bg-foreground hover:text-background font-mono uppercase tracking-wider text-sm py-3 minimal-hover"
              onClick={() => scrollToSection("contact")}
            >
              CONTACT US
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-muted-foreground hover:text-foreground font-mono uppercase tracking-wider text-sm py-3 minimal-hover"
              onClick={() => scrollToSection("pricing")}
            >
              VIEW PRICING
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
