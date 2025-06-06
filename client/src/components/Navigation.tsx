import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();

  // Scroll progress and background blur effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavItems = () => {
    const baseItems = [
      { href: "/", label: "Home" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/blog", label: "Blog" },
      { href: "/pricing", label: "Pricing" },
    ];
    
    // Only show Contact for non-authenticated users
    if (!isAuthenticated) {
      baseItems.push({ href: "/contact", label: "Contact" });
    }
    
    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-lg' 
        : 'bg-background/80 backdrop-blur-lg border-b border-border/50'
    }`}>
      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent to-primary transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-lg font-mono tracking-wider text-foreground cursor-pointer hover:text-accent transition-colors">
                PERFECTPIXELAI
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation with Enhanced Interactions */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-12">
              {navItems.map((item, index) => (
                <Link key={item.href} href={item.href}>
                  <span 
                    className={`relative text-sm font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer group ${
                      location === item.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.label}
                    {/* Animated underline */}
                    <span className={`absolute left-0 -bottom-1 h-0.5 bg-accent transition-all duration-300 ${
                      location === item.href 
                        ? "w-full" 
                        : "w-0 group-hover:w-full"
                    }`}></span>
                    {/* Hover glow effect */}
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-accent/20 blur-sm transition-opacity duration-300 rounded"></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Auth & CTA Buttons with Enhanced Interactions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user && (user as any).isAdmin && (
                  <Link href="/admin">
                    <Button
                      variant="ghost"
                      className="text-sm font-mono uppercase tracking-wider group relative overflow-hidden"
                    >
                      <span className="relative z-10 transition-transform duration-200 group-hover:scale-105">Admin</span>
                      <div className="absolute inset-0 bg-accent/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  onClick={() => window.location.href = '/api/logout'}
                  className="text-sm font-mono uppercase tracking-wider group relative overflow-hidden hover:text-red-400 transition-colors duration-300"
                >
                  <span className="relative z-10 transition-transform duration-200 group-hover:scale-105">Logout</span>
                  <div className="absolute inset-0 bg-red-500/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-sm font-mono uppercase tracking-wider group relative overflow-hidden bg-accent/5 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 transition-all duration-300"
                >
                  <span className="relative z-10 transition-all duration-200 group-hover:scale-105 group-hover:text-accent">Login</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span 
                  className={`block py-2 text-sm font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    location === item.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </span>
              </Link>
            ))}

            <div className="pt-4 border-t border-border space-y-4">
              {isAuthenticated ? (
                <>
                  {user && (user as any).isAdmin && (
                    <Link href="/admin">
                      <Button
                        variant="ghost"
                        className="w-full text-sm font-mono uppercase tracking-wider"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => window.location.href = '/api/logout'}
                    className="w-full text-sm font-mono uppercase tracking-wider"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => window.location.href = '/api/login'}
                  className="w-full text-sm font-mono uppercase tracking-wider"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}