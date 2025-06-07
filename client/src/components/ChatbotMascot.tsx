import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Bot, ArrowRight } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  options?: string[];
  recommendation?: {
    service: string;
    price: string;
    reason: string;
    features: string[];
  };
}

export default function ChatbotMascot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const questions = [
    {
      text: "Hi! I'm PixelBot. What type of website project do you have?",
      options: [
        "I need a brand new website",
        "I want to redesign my current site", 
        "I need reliable hosting"
      ]
    },
    {
      text: "What's your main business goal?",
      options: [
        "Attract more customers",
        "Sell products online",
        "Share information/portfolio"
      ]
    }
  ];

  const getRecommendation = (answers: string[]): any => {
    const projectType = answers[0]?.toLowerCase() || "";
    
    if (projectType.includes("hosting")) {
      return {
        service: "Website Hosting",
        price: "$25/mo",
        reason: "Reliable hosting will keep your website fast and secure!",
        features: [
          "99.9% uptime guarantee",
          "SSL certificate included",
          "Daily automated backups",
          "24/7 technical support"
        ]
      };
    }
    
    if (projectType.includes("redesign")) {
      return {
        service: "Website Redesign",
        price: "$449",
        reason: "A modern redesign will improve your site's performance and user experience!",
        features: [
          "Modern, mobile-friendly design",
          "Improved site speed",
          "Better user experience",
          "SEO optimization"
        ]
      };
    }

    return {
      service: "New Website",
      price: "$499",
      reason: "A brand new website is perfect for your goals!",
      features: [
        "Up to 5 custom pages",
        "Mobile responsive design", 
        "SEO optimization included",
        "30-day revision period"
      ]
    };
  };

  const addMessage = (text: string, isBot: boolean, options?: string[], recommendation?: any) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isBot,
      options,
      recommendation
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleStartChat = () => {
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage(questions[0].text, true, questions[0].options);
      }, 500);
    }
  };

  const handleOptionClick = (option: string) => {
    // Add user message
    addMessage(option, false);
    
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        addMessage(questions[currentStep + 1].text, true, questions[currentStep + 1].options);
      } else {
        // Show recommendation
        const recommendation = getRecommendation([option]);
        addMessage(
          `Perfect! Based on your needs, I recommend our ${recommendation.service}. ${recommendation.reason}`,
          true,
          undefined,
          recommendation
        );
      }
    }, 1000);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) handleStartChat();
          }}
          className="w-16 h-16 rounded-full bg-accent hover:bg-accent/90 text-black shadow-xl transition-all duration-300 hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] z-40 shadow-2xl border-accent/30">
          <div className="flex items-center justify-between p-4 border-b border-border bg-accent/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-black" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">PixelBot</h3>
                <p className="text-xs text-muted-foreground">AI Assistant</p>
              </div>
            </div>
          </div>

          <CardContent className="p-0 h-[400px] overflow-y-auto">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot 
                      ? 'bg-muted text-foreground' 
                      : 'bg-accent text-black'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    
                    {/* Options */}
                    {message.options && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleOptionClick(option)}
                            className="text-xs"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* Recommendation */}
                    {message.recommendation && (
                      <Card className="mt-4 border-accent/30">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-foreground">
                              {message.recommendation.service}
                            </h4>
                            <Badge variant="secondary" className="bg-accent/20 text-accent">
                              {message.recommendation.price}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            {message.recommendation.features.map((feature, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <ArrowRight className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              onClick={scrollToContact}
                              className="flex-1 bg-accent hover:bg-accent/90 text-black"
                            >
                              GET STARTED
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}