import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();

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
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-lg font-mono tracking-wider text-foreground cursor-pointer hover:text-accent transition-colors">
                PERFECTPIXELAI
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-12">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className={`text-sm font-mono uppercase tracking-wider transition-colors minimal-hover cursor-pointer ${
                    location === item.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Auth & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user && (user as any).isAdmin && (
                  <Link href="/admin">
                    <Button
                      variant="ghost"
                      className="text-sm font-mono uppercase tracking-wider"
                    >
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  onClick={() => window.location.href = '/api/logout'}
                  className="text-sm font-mono uppercase tracking-wider"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => window.location.href = '/api/login'}
                  className="text-sm font-mono uppercase tracking-wider"
                >
                  Login
                </Button>
                <Link href="/contact">
                  <Button 
                    variant="ghost"
                    className="text-sm font-mono uppercase tracking-wider hover:text-accent minimal-hover"
                  >
                    CONTACT
                  </Button>
                </Link>
              </>
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
                <>
                  <Button
                    variant="ghost"
                    onClick={() => window.location.href = '/api/login'}
                    className="w-full text-sm font-mono uppercase tracking-wider"
                  >
                    Login
                  </Button>
                  <Link href="/contact">
                    <Button 
                      variant="ghost"
                      className="w-full text-sm font-mono uppercase tracking-wider hover:text-accent minimal-hover"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      CONTACT
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}