import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "portfolio", "pricing", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const isHomePage = location === "/";

  const navItems = isHomePage ? [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "pricing", label: "Pricing" },
    { id: "contact", label: "Contact" },
  ] : [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

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
                isHomePage && 'id' in item ? (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-mono uppercase tracking-wider transition-colors minimal-hover ${
                      activeSection === item.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link key={item.href} href={item.href}>
                    <span className={`text-sm font-mono uppercase tracking-wider transition-colors minimal-hover cursor-pointer ${
                      location === item.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Auth & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.isAdmin && (
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
                <Button 
                  variant="ghost"
                  onClick={() => isHomePage ? scrollToSection("contact") : window.location.href = "/#contact"}
                  className="text-sm font-mono uppercase tracking-wider hover:text-accent minimal-hover"
                >
                  CONTACT
                </Button>
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
              isHomePage && 'id' in item ? (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-2 text-sm font-mono uppercase tracking-wider transition-colors ${
                    activeSection === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <Link key={item.href} href={item.href}>
                  <span className={`block w-full text-left py-2 text-sm font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    location === item.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>
                    {item.label}
                  </span>
                </Link>
              )
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              {isAuthenticated ? (
                <>
                  {user?.isAdmin && (
                    <Link href="/admin">
                      <Button 
                        variant="ghost"
                        className="w-full text-sm font-mono uppercase tracking-wider"
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
                  <Button 
                    variant="ghost"
                    onClick={() => isHomePage ? scrollToSection("contact") : window.location.href = "/#contact"}
                    className="w-full text-sm font-mono uppercase tracking-wider"
                  >
                    CONTACT
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
