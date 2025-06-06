import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

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

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/posts/${slug}`],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-light text-foreground mb-8">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button variant="outline" className="font-mono uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 font-mono uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <article>
          {post.imageUrl && (
            <div className="aspect-video mb-12 overflow-hidden rounded-lg">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <header className="mb-12">
            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {Math.ceil(post.content.split(' ').length / 200)} min read
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            <div 
              className="text-foreground font-light leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}