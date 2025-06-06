import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Portfolio() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const portfolioItems = [
    {
      title: "Sweet Treats Bakery",
      description: "A delightful 5-page site with a menu, contact form, and online ordering.",
      testimonial: "PerfectPixelAI gave us a beautiful website that our customers love!",
      author: "Jane Doe, Owner",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    },
    {
      title: "John Smith Photography",
      description: "A sleek portfolio site with a blog to showcase stunning visuals.",
      testimonial: "The AI process was fast, and the result was beyond my expectations.",
      author: "John Smith",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    },
    {
      title: "GreenLeaf Landscaping",
      description: "A modernized 5-page site updated from an old design, now mobile-friendly.",
      testimonial: "Our revamped site looks amazing and works perfectly!",
      author: "Mark Lee, Manager",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <span className="text-sm font-semibold text-white">🎨 Our Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            AI-Designed Websites That <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Inspire</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Discover how PerfectPixelAI transforms ideas into pixel-perfect websites.
            Real projects, real results, real success stories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="group relative portfolio-item"
            >
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl overflow-hidden hover:bg-white/15 transition-all duration-500 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.title} website`}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-white">Live Project</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                  <p className="text-blue-100 mb-4 leading-relaxed">{item.description}</p>
                  <blockquote className="relative border-l-4 border-blue-400/50 pl-4 italic text-blue-200 bg-white/5 rounded-r-lg p-3">
                    <div className="absolute top-2 left-2 text-blue-400/30 text-2xl">"</div>
                    <div className="pl-4">
                      {item.testimonial}
                      <footer className="text-sm text-blue-300 mt-2 font-medium not-italic">
                        – {item.author}
                      </footer>
                    </div>
                  </blockquote>
                  
                  {/* Hover effect indicators */}
                  <div className="flex items-center justify-between mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                    <span className="text-xs text-blue-300 font-medium">View Details →</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced CTA section */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              These projects highlight our ability to deliver affordable, professional websites 
              that drive real business results for small businesses like yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold shadow-xl transform hover:scale-105 transition-all duration-200"
                onClick={() => scrollToSection("contact")}
              >
                Start Your Project Today
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                onClick={() => scrollToSection("pricing")}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
