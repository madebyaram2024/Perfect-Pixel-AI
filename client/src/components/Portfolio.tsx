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
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Work: AI-Designed Websites
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how PerfectPixelAI transforms ideas into pixel-perfect websites.
            Here are some examples of our AI-powered web design projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <Card
              key={index}
              className="portfolio-item bg-card shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.title} website`}
                  className="w-full h-48 object-cover transition-transform"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <blockquote className="border-l-4 border-primary/20 pl-4 italic text-muted-foreground">
                  "{item.testimonial}"
                  <footer className="text-sm text-muted-foreground mt-1">
                    – {item.author}
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            These projects highlight our ability to deliver affordable, professional websites for small businesses.
          </p>
          <Button
            size="lg"
            onClick={() => scrollToSection("contact")}
          >
            Ready to see what we can do for you?
          </Button>
        </div>
      </div>
    </section>
  );
}
