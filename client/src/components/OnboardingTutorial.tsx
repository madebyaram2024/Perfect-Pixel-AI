import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ArrowRight, ArrowLeft, Play, CheckCircle } from "lucide-react";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: "top" | "bottom" | "left" | "right";
  action?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    title: "Welcome to PerfectPixelAI!",
    description: "Let's take a quick tour to show you how we create professional websites that convert visitors into customers.",
    target: "hero-section",
    position: "bottom"
  },
  {
    id: "services",
    title: "Our AI-Powered Services",
    description: "Browse our comprehensive web design packages. Each service is optimized for your business needs.",
    target: "services-section", 
    position: "top"
  },
  {
    id: "portfolio",
    title: "Real Client Success Stories",
    description: "See actual websites we've built for clients across different industries.",
    target: "portfolio-section",
    position: "top"
  },
  {
    id: "pricing",
    title: "Transparent Pricing",
    description: "Choose from our affordable packages. All pricing is upfront with no hidden fees.",
    target: "pricing-section",
    position: "top"
  },
  {
    id: "contact",
    title: "Get Started Today",
    description: "Ready to transform your business? Contact us for a free consultation.",
    target: "contact-section",
    position: "top",
    action: "Click 'Get Started' to begin your website project"
  }
];

export default function OnboardingTutorial() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  useEffect(() => {
    // Check if user has seen tutorial before
    const tutorialSeen = localStorage.getItem("tutorial-completed");
    if (!tutorialSeen) {
      // Show tutorial after 2 seconds
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
    setHasSeenTutorial(true);
  }, []);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollToTarget(tutorialSteps[currentStep + 1].target);
    } else {
      completeTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollToTarget(tutorialSteps[currentStep - 1].target);
    }
  };

  const skipTutorial = () => {
    completeTutorial();
  };

  const completeTutorial = () => {
    setIsActive(false);
    localStorage.setItem("tutorial-completed", "true");
    setHasSeenTutorial(true);
  };

  const scrollToTarget = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth", 
        block: "center",
        inline: "center" 
      });
    }
  };

  const startTutorial = () => {
    setCurrentStep(0);
    setIsActive(true);
    scrollToTarget(tutorialSteps[0].target);
  };

  const currentStepData = tutorialSteps[currentStep];

  if (!isActive && hasSeenTutorial) {
    return (
      <Button
        onClick={startTutorial}
        variant="outline"
        size="sm"
        className="fixed bottom-4 left-4 z-50 bg-card/90 backdrop-blur-sm border-accent/30 hover:bg-accent/10"
      >
        <Play className="w-4 h-4 mr-2" />
        Take Tour
      </Button>
    );
  }

  return (
    <>
      {isActive && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-300" />

          {/* Tutorial Card */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-card border border-border rounded-lg shadow-2xl p-6 mx-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="bg-accent/20 text-accent">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </Badge>
                <Button
                  onClick={skipTutorial}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-border rounded-full h-2 mb-6">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                />
              </div>

              {/* Content */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {currentStepData.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {currentStepData.description}
                </p>
                {currentStepData.action && (
                  <div className="mt-3 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                    <p className="text-sm text-accent font-medium">
                      💡 {currentStepData.action}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  size="sm"
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  <Button
                    onClick={skipTutorial}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Skip Tour
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-accent hover:bg-accent/90"
                  >
                    {currentStep === tutorialSteps.length - 1 ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Complete
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Spotlight Effect */}
          <div 
            className="fixed inset-0 pointer-events-none z-30 animate-in fade-in duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, transparent 150px, rgba(0,0,0,0.7) 300px)`
            }}
          />
        </>
      )}
    </>
  );
}