import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-mono mb-8">
            PORTFOLIO
          </p>
          <h1 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-8">
            Our latest
            <br />
            <span className="text-gradient">work</span>
          </h1>
          <div className="border-gradient mx-auto w-24"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {portfolioItems.map((item, index) => (
            <Card key={item.id} className="bg-card border-border overflow-hidden group">
              <div className="aspect-video bg-muted relative overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <span className="font-mono text-sm">IMAGE PLACEHOLDER</span>
                  </div>
                )}
                {item.featured && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    FEATURED
                  </Badge>
                )}
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <CardContent className="p-8">
                <h3 className="text-xl font-light text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  {item.description}
                </p>
                {item.testimonial && item.clientName && (
                  <blockquote className="border-l-2 border-accent pl-6">
                    <p className="text-sm font-light italic text-muted-foreground mb-2">
                      "{item.testimonial}"
                    </p>
                    <cite className="text-xs font-mono uppercase tracking-wider text-accent">
                      {item.clientName}
                    </cite>
                  </blockquote>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {portfolioItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-light">
              Portfolio items will be displayed here once added by the admin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}