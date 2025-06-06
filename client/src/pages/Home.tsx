import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BarChart3, Users, FileText, ShoppingCart } from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-8">
            Welcome back,
            <br />
            <span className="text-gradient">{user?.firstName || 'User'}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your projects and track your progress from your dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                    PROJECTS
                  </p>
                  <p className="text-2xl font-light text-foreground">3</p>
                </div>
                <BarChart3 className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                    VISITORS
                  </p>
                  <p className="text-2xl font-light text-foreground">1,234</p>
                </div>
                <Users className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                    BLOG POSTS
                  </p>
                  <p className="text-2xl font-light text-foreground">8</p>
                </div>
                <FileText className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                    ORDERS
                  </p>
                  <p className="text-2xl font-light text-foreground">12</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-light">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/blog">
                <Button variant="outline" className="w-full justify-start font-mono uppercase tracking-wider">
                  <FileText className="w-4 h-4 mr-2" />
                  View Blog
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" className="w-full justify-start font-mono uppercase tracking-wider">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Portfolio
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" className="w-full justify-start font-mono uppercase tracking-wider">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  View Pricing
                </Button>
              </Link>
              {user?.isAdmin && (
                <Link href="/admin">
                  <Button className="w-full justify-start bg-accent text-accent-foreground hover:bg-accent/90 font-mono uppercase tracking-wider">
                    <Users className="w-4 h-4 mr-2" />
                    Admin Panel
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-light">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                  <div>
                    <p className="text-sm font-light">New portfolio item added</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                  <div>
                    <p className="text-sm font-light">Blog post published</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                  <div>
                    <p className="text-sm font-light">New order received</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
