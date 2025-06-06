import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center bg-background grid-pattern noise-bg"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-32">
        <div className="text-center space-y-12 animate-fade-in-up">
          {/* Main heading */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-mono">
                PERFECT PIXEL AI
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.9] tracking-tight">
                <span className="text-gradient">AI-Powered</span>
                <br />
                <span className="text-foreground">Websites</span>
              </h1>
            </div>
            
            <div className="border-gradient mx-auto w-24"></div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              Professional websites built with artificial intelligence.
              <br />
              Starting at <span className="text-accent font-medium">$199</span>.
            </p>
          </div>

          {/* CTA Section */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base font-medium minimal-hover"
                onClick={() => scrollToSection("contact")}
              >
                START PROJECT
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-foreground hover:text-primary px-8 py-3 text-base font-medium minimal-hover"
                onClick={() => scrollToSection("portfolio")}
              >
                VIEW WORK
              </Button>
            </div>

            {/* Minimal indicators */}
            <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground font-mono">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-accent animate-subtle-pulse"></div>
                <span>1-2 WEEKS</span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-accent animate-subtle-pulse"></div>
                <span>RESPONSIVE</span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-accent animate-subtle-pulse"></div>
                <span>SEO READY</span>
              </div>
            </div>
          </div>

          {/* Minimal scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="w-px h-16 bg-border"></div>
            <div className="w-1 h-1 bg-muted-foreground animate-subtle-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
