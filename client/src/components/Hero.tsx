import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Star } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Cinematic timing: start at 80%, then dramatic slowdown
    const handleVideoPlay = () => {
      video.playbackRate = 0.8; // Start at 80% speed
    };

    // Dramatic slowdown progression: 80% -> 50% -> 25% -> 5% -> freeze
    let hasStartedSlowdown = false;
    let hasReachedEnd = false;
    
    const handleTimeUpdate = () => {
      if (video.duration && !hasReachedEnd) {
        const timeRemaining = video.duration - video.currentTime;
        
        // Start dramatic slowdown when 4 seconds remain
        if (timeRemaining <= 4 && !hasStartedSlowdown) {
          hasStartedSlowdown = true;
          
          // Dramatic slowdown: 80% -> 50% -> 25% -> 5% -> freeze
          setTimeout(() => {
            if (video.playbackRate > 0) video.playbackRate = 0.5;
          }, 0);
          
          setTimeout(() => {
            if (video.playbackRate > 0) video.playbackRate = 0.25;
          }, 1000);
          
          setTimeout(() => {
            if (video.playbackRate > 0) video.playbackRate = 0.1;
          }, 2000);
          
          setTimeout(() => {
            video.pause();
            video.currentTime = video.duration - 0.1;
            hasReachedEnd = true;
          }, 3000);
        }
      }
    };

    // Handle when video ends naturally
    const handleVideoEnd = () => {
      video.currentTime = video.duration - 0.2;
      video.pause();
    };

    video.addEventListener('play', handleVideoPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('play', handleVideoPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero-section" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover hero-video"
          style={{
            filter: 'brightness(1.2) contrast(1.4)',
          }}
        >
          <source src="/uploads/hero-background.mp4" type="video/mp4" />
          <source src="/uploads/hero-background.webm" type="video/webm" />
        </video>
      </div>
      
      {/* Text Readability Enhancement */}
      <div className="absolute inset-0 bg-black/[0.85]"></div>
      
      {/* Floating Elements - Symmetrical */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1500"></div>
      <div className="absolute top-1/2 left-20 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-bounce"></div>
      <div className="absolute top-1/2 right-20 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-bounce delay-700"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Trust Badge */}
        <div className="flex justify-center mb-8 animate-fade-in-up">
          <Badge className="bg-accent/20 text-accent border-accent/30 px-6 py-3 text-sm backdrop-blur-sm shadow-lg hover:bg-accent/30 transition-all duration-300">
            <Star className="w-4 h-4 mr-2 fill-current animate-pulse" />
            Go Live In 7 Days
          </Badge>
        </div>

        {/* Main Headline */}
        <div className="animate-fade-in-up delay-200">
          <h1 className="text-5xl md:text-7xl font-light leading-[0.85] mb-8 tracking-tight">
            <span className="text-foreground hover:text-accent transition-colors duration-500">Get A Professional</span>
            <br />
            <span className="text-gradient bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient-x">Website That Works</span>
          </h1>
        </div>

        {/* Subheadline */}
        <div className="animate-fade-in-up delay-300">
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            AI-powered web design that converts visitors into customers. 
            <br className="hidden md:block" />
            <span className="text-foreground font-medium">No technical knowledge required. Fast delivery guaranteed.</span>
          </p>
        </div>

        {/* Key Benefits */}
        <div className="animate-fade-in-up delay-500">
          <div className="flex flex-wrap justify-center gap-8 mb-12 text-muted-foreground">
            <div className="flex items-center gap-3 bg-card/30 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 hover:border-accent/30 transition-all duration-300">
              <Check className="w-5 h-5 text-accent animate-pulse" />
              <span className="font-medium">Mobile Responsive</span>
            </div>
            <div className="flex items-center gap-3 bg-card/30 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 hover:border-accent/30 transition-all duration-300">
              <Check className="w-5 h-5 text-accent animate-pulse delay-100" />
              <span className="font-medium">SEO Optimized</span>
            </div>
            <div className="flex items-center gap-3 bg-card/30 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 hover:border-accent/30 transition-all duration-300">
              <Check className="w-5 h-5 text-accent animate-pulse delay-200" />
              <span className="font-medium">7-Day Delivery</span>
            </div>
            <div className="flex items-center gap-3 bg-card/30 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 hover:border-accent/30 transition-all duration-300">
              <Check className="w-5 h-5 text-accent animate-pulse delay-300" />
              <span className="font-medium">30-Day Revisions</span>
            </div>
          </div>
        </div>

        {/* Pricing Display */}
        <div className="animate-fade-in-up delay-700 mb-12">
          <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-2xl p-8 max-w-lg mx-auto shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="text-4xl md:text-5xl font-light text-foreground mb-3">
              Starting at <span className="text-accent font-medium">$449</span>
            </div>
            <p className="text-muted-foreground text-lg">
              Website redesigns • New websites from $499 • Hosting from $25/mo
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up delay-1000">
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/checkout?service=new_website">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-5 text-lg group shadow-2xl hover:shadow-accent/25 transition-all duration-300 transform hover:scale-105"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-foreground/20 text-foreground hover:bg-foreground hover:text-background px-10 py-5 text-lg backdrop-blur-sm bg-card/10 hover:border-accent transition-all duration-300 transform hover:scale-105"
              >
                View Our Work
              </Button>
            </Link>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Professional websites that actually work for your business
          </p>
        </div>
      </div>
    </section>
  );
}