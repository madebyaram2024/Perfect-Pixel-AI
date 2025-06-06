import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User, Sparkles, ArrowRight } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
  recommendation?: {
    service: string;
    price: string;
    reason: string;
    features: string[];
  };
}

interface ServiceRecommendation {
  service: string;
  price: string;
  reason: string;
  features: string[];
}

export default function ChatbotMascot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const questions = [
    {
      text: "Hi! I'm PixelBot. What type of website project do you have?",
      options: [
        "I need a brand new website",
        "I want to redesign my current site", 
        "I need reliable hosting",
        "Not sure - help me decide"
      ]
    },
    {
      text: "What's the main purpose of your website?",
      options: [
        "Get more customers for my business",
        "Sell products or services online",
        "Share content and information",
        "Showcase my work or portfolio"
      ]
    },
    {
      text: "What's your budget range?",
      options: [
        "Under $200",
        "$200 - $500",
        "$500 - $1000",
        "Budget is flexible"
      ]
    },
    {
      text: "When do you need this completed?",
      options: [
        "Within 1 week",
        "Within 2-3 weeks",
        "Within a month",
        "No specific deadline"
      ]
    }
  ];

  const getRecommendation = (answers: string[]): ServiceRecommendation => {
    const [projectType, purpose, budget, timeline] = answers;

    // Logic for Website Redesign ($449)
    if (projectType.includes("redesign") || projectType.includes("current")) {
      return {
        service: "Website Redesign",
        price: "$449",
        reason: "Perfect for updating your existing site with modern design and better performance!",
        features: [
          "Redesign of up to 5 pages",
          "Mobile-responsive updates", 
          "Speed optimization",
          "SEO improvements"
        ]
      };
    }

    // Logic for Website Hosting ($25/mo)
    if (projectType.includes("hosting") || projectType.includes("reliable hosting")) {
      return {
        service: "Website Hosting",
        price: "$25/mo",
        reason: "Reliable hosting will keep your website fast, secure, and always available!",
        features: [
          "99.9% uptime guarantee",
          "SSL certificate included",
          "Daily automated backups",
          "24/7 technical support"
        ]
      };
    }

    // Default to New Website ($499) - Most Popular
    return {
      service: "New Website",
      price: "$499",
      reason: "A brand new website is perfect for your goals! You'll get everything you need to succeed online.",
      features: [
        "Up to 5 custom pages",
        "Mobile responsive design",
        "SEO optimization included",
        "30-day revision period"
      ]
    };
  };

  const addMessage = (text: string, isBot: boolean, options?: string[], recommendation?: ServiceRecommendation) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
      options,
      recommendation
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleOptionClick = (option: string) => {
    // Add user's choice
    addMessage(option, false);
    
    const newAnswers = [...userAnswers, option];
    setUserAnswers(newAnswers);
    
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    if (nextStep < questions.length) {
      // Continue with next question
      simulateTyping(() => {
        addMessage(questions[nextStep].text, true, questions[nextStep].options);
      });
    } else {
      // Generate recommendation
      simulateTyping(() => {
        const recommendation = getRecommendation(newAnswers);
        addMessage(
          `Based on your answers, I recommend our ${recommendation.service} service! ${recommendation.reason}`,
          true,
          undefined,
          recommendation
        );
      }, 2000);
    }
  };

  const handleStartChat = () => {
    if (messages.length === 0) {
      simulateTyping(() => {
        addMessage(questions[0].text, true, questions[0].options);
      }, 800);
    }
  };

  const handleRestart = () => {
    setMessages([]);
    setCurrentStep(0);
    setUserAnswers([]);
    setIsTyping(false);
    handleStartChat();
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    } else {
      // If on a different page, navigate to home with contact section
      window.location.href = '/#contact';
    }
  };

  return (
    <>
      {/* Floating Chat Button with Enhanced Animations */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          <Button
            onClick={() => {
              setIsOpen(!isOpen);
              if (!isOpen) handleStartChat();
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-3 group-hover:shadow-accent/30 animate-float"
          >
            <div className="transition-transform duration-300 group-hover:scale-110">
              {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6 animate-pulse" />}
            </div>
          </Button>
          
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping opacity-75"></div>
          
          {/* Pulsing notification dot with bounce */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce shadow-lg">
              <div className="w-full h-full bg-red-400 rounded-full animate-pulse"></div>
            </div>
          )}
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-foreground text-background text-xs px-3 py-1 rounded-lg whitespace-nowrap">
              Need help choosing a service?
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] z-40 shadow-2xl border-accent">
          <div className="flex items-center justify-between p-4 border-b border-border bg-accent/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-mono text-sm font-medium text-foreground">PixelBot</h3>
                <p className="text-xs text-muted-foreground">AI Service Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <CardContent className="flex flex-col h-[400px] p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-accent mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">
                    Hi! I'm here to help you find the perfect service for your needs.
                  </p>
                </div>
              )}

              {messages.map((message, index) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                    {message.isBot && (
                      <div className="flex items-center gap-2 mb-1 animate-fade-in-up" style={{ animationDelay: `${index * 100 + 50}ms` }}>
                        <Bot className="w-4 h-4 text-accent animate-pulse" />
                        <span className="text-xs text-muted-foreground font-mono">PixelBot</span>
                      </div>
                    )}
                    
                    <div className={`p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                      message.isBot 
                        ? 'bg-accent/10 text-foreground hover:bg-accent/20' 
                        : 'bg-gradient-to-r from-accent to-primary text-accent-foreground hover:from-accent/90 hover:to-primary/90 shadow-lg'
                    }`}>
                      <p className="text-sm font-light">{message.text}</p>
                    </div>

                    {/* Options with staggered animations */}
                    {message.options && (
                      <div className="mt-3 space-y-2">
                        {message.options.map((option, optionIndex) => (
                          <Button
                            key={optionIndex}
                            variant="outline"
                            size="sm"
                            onClick={() => handleOptionClick(option)}
                            className="w-full text-left justify-start text-xs font-light border-accent/30 hover:bg-accent/10 hover:border-accent hover:scale-105 transition-all duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${optionIndex * 150 + 300}ms` }}
                          >
                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                              {option}
                            </span>
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* Recommendation Card */}
                    {message.recommendation && (
                      <Card className="mt-4 border-accent/30">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-mono text-sm font-medium text-foreground">
                              {message.recommendation.service}
                            </h4>
                            <Badge variant="secondary" className="bg-accent/20 text-accent">
                              {message.recommendation.price}
                            </Badge>
                          </div>
                          
                          <div className="space-y-3">
                            {message.recommendation.features.map((feature, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <ArrowRight className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-muted-foreground font-light">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              onClick={scrollToContact}
                              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-mono text-xs"
                            >
                              GET STARTED
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleRestart}
                              className="text-xs font-mono"
                            >
                              TRY AGAIN
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  
                  {message.isBot && (
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center order-1 mr-2 mt-6 flex-shrink-0">
                      <Bot className="w-3 h-3 text-accent-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-accent-foreground" />
                    </div>
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}