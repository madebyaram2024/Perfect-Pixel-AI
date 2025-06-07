import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  testimonial?: string;
  clientName?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

export default function Portfolio() {
  const { data: portfolioItems = [], isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio/items"],
  });

  // Filter for featured items only and sort by order
  const featuredItems = portfolioItems
    .filter(item => item.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3); // Show only top 3 featured items

  if (isLoading) {
    return (
      <section className="py-16 bg-card/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
              Recent Work
            </h2>
            <p className="text-muted-foreground">
              See what we've built for other businesses
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/3] bg-muted animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-card/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
            Recent Work
          </h2>
          <p className="text-muted-foreground">
            See what we've built for other businesses
          </p>
        </div>

        {/* Enhanced Grid with Micro-interactions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {featuredItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="group overflow-hidden border-border hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:scale-105 hover:-translate-y-1 cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-[4/3] bg-muted overflow-hidden relative">
                <img 
                  src={item.imageUrl} 
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
                
                {item.testimonial && item.clientName && (
                  <div className="mt-3 p-2 bg-muted/30 rounded border-l-2 border-accent/50">
                    <p className="text-xs text-muted-foreground italic mb-1">"{item.testimonial}"</p>
                    <p className="text-xs text-muted-foreground font-medium">— {item.clientName}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <Link href="/portfolio">
            <Button
              variant="outline"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}