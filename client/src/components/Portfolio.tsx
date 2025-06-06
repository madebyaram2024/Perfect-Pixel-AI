import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function Portfolio() {
  const portfolioItems = [
    {
      title: "Sweet Treats Bakery",
      description: "Modern bakery website with online ordering",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      title: "Photography Portfolio",
      description: "Clean portfolio showcasing professional work",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      title: "Landscaping Service",
      description: "Mobile-first redesign for local business",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    }
  ];

  return (
    <section className="py-16 bg-card/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Compact Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
            Recent Work
          </h2>
          <p className="text-muted-foreground">
            See what we've built for other businesses
          </p>
        </div>

        {/* Enhanced Grid with Micro-interactions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {portfolioItems.map((item, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border-border hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:scale-105 hover:-translate-y-1 cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-[4/3] bg-muted overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-accent-foreground" />
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4 group-hover:bg-card/80 transition-colors duration-300">
                <h3 className="font-medium text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <Button
            variant="outline"
            className="border-foreground text-foreground hover:bg-foreground hover:text-background"
          >
            View All Projects
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}