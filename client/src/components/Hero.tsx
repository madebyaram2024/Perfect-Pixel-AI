import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero-gradient pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Affordable AI-Powered Websites for Your Business
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Get a professional, modern website built with AI technology for just $199.
            </p>
            <p className="text-lg mb-8 text-blue-50">
              Welcome to PerfectPixelAI, where we make web design simple, fast, and affordable. Using the power of artificial intelligence, we create stunning websites tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
                onClick={() => scrollToSection("pricing")}
              >
                View Pricing
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-primary"
                onClick={() => scrollToSection("portfolio")}
              >
                See Our Work
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Modern web design workspace"
              className="rounded-xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
