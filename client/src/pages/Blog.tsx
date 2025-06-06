import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Calendar, Clock } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  published: boolean;
  authorId?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Blog() {
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const publishedPosts = blogPosts.filter(post => post.published);

  return (
    <div className="py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-mono mb-8">
            BLOG
          </p>
          <h1 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-8">
            Latest insights &
            <br />
            <span className="text-gradient">updates</span>
          </h1>
          <div className="border-gradient mx-auto w-24"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full cursor-pointer group hover:shadow-lg transition-all duration-300 bg-card border-border">
                {post.imageUrl && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {Math.ceil(post.content.split(' ').length / 200)} min read
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-light text-foreground mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {publishedPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-light">
              Blog posts will be displayed here once published by the admin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}