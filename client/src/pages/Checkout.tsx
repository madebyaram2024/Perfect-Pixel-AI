import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Clock, Shield, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface CheckoutStep {
  title: string;
  description: string;
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Get service type from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const serviceType = urlParams.get('service') || 'new_website';
  
  const [currentStep, setCurrentStep] = useState(1);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [hostingType, setHostingType] = useState<'managed' | 'files_only'>('files_only');
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    projectDetails: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const steps: CheckoutStep[] = [
    { title: "Package Selection", description: "Choose your service package" },
    { title: "Add-ons", description: "Enhance your website with additional features" },
    { title: "Hosting", description: "Select your hosting preference" },
    { title: "Customer Info", description: "Provide your contact details" },
    { title: "Payment", description: "Complete your purchase" }
  ];

  const packages = {
    new_website: {
      name: "New Website",
      price: 499,
      description: "Complete website built from scratch with modern design",
      features: [
        "Custom Design & Development",
        "Up to 5 Pages",
        "Mobile Responsive Design",
        "Basic SEO Optimization",
        "Contact Form Integration",
        "Social Media Links",
        "1 Month Support"
      ],
      timeline: "7-14 days"
    },
    redesign: {
      name: "Website Redesign", 
      price: 449,
      description: "Complete redesign of your existing website",
      features: [
        "Modern Design Update",
        "Performance Optimization",
        "Mobile Optimization",
        "SEO Improvements",
        "Content Migration",
        "User Experience Enhancement",
        "1 Month Support"
      ],
      timeline: "5-10 days"
    }
  };

  const addons: Addon[] = [
    { 
      id: "ecommerce", 
      name: "E-commerce Integration", 
      description: "Full online store with payment processing",
      price: 200 
    },
    { 
      id: "cms", 
      name: "Content Management System", 
      description: "Easy-to-use admin panel for content updates",
      price: 150 
    },
    { 
      id: "seo_premium", 
      name: "Premium SEO Package", 
      description: "Advanced SEO optimization and Google setup",
      price: 100 
    },
    { 
      id: "analytics", 
      name: "Advanced Analytics Setup", 
      description: "Google Analytics, Tag Manager, and conversion tracking",
      price: 75 
    },
    { 
      id: "social_media", 
      name: "Social Media Integration", 
      description: "Social feeds, sharing buttons, and widgets",
      price: 50 
    },
    { 
      id: "booking", 
      name: "Online Booking System", 
      description: "Appointment scheduling and calendar integration",
      price: 125 
    },
  ];

  const hostingOptions = {
    files_only: {
      name: "Files Only",
      price: 0,
      description: "Get your website files to host anywhere you prefer",
      features: [
        "Complete source code",
        "Installation guide",
        "One-time file delivery",
        "Basic documentation"
      ],
      badge: "Most Flexible"
    },
    managed: {
      name: "Managed Hosting",
      price: 25,
      description: "Professional hosting with ongoing maintenance",
      features: [
        "High-performance servers",
        "SSL certificate included",
        "Daily automated backups",
        "24/7 uptime monitoring",
        "Monthly content updates",
        "Technical support"
      ],
      badge: "Most Popular"
    }
  };

  const selectedPackage = packages[serviceType as keyof typeof packages];
  const basePrice = selectedPackage?.price || 0;
  const addonsPrice = selectedAddons.reduce((total, addonId) => {
    const addon = addons.find(a => a.id === addonId);
    return total + (addon?.price || 0);
  }, 0);
  const hostingPrice = hostingOptions[hostingType].price;
  const totalPrice = basePrice + addonsPrice + (hostingType === 'managed' ? hostingPrice : 0);

  const handleAddonChange = (addonId: string, checked: boolean) => {
    if (checked) {
      setSelectedAddons(prev => [...prev, addonId]);
    } else {
      setSelectedAddons(prev => prev.filter(id => id !== addonId));
    }
  };

  const createPaymentIntent = async () => {
    if (!customerInfo.email || !customerInfo.name) {
      toast({
        title: "Missing Information",
        description: "Please provide your contact details before proceeding to payment",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", {
        serviceType,
        basePrice,
        addons: selectedAddons.map(id => {
          const addon = addons.find(a => a.id === id);
          return { id, name: addon?.name, price: addon?.price };
        }),
        hostingType,
        totalAmount: totalPrice,
        customerInfo
      });
      
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create payment intent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 4) {
      // Validate customer info before proceeding to payment
      if (!customerInfo.email || !customerInfo.name) {
        toast({
          title: "Required Information Missing",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      createPaymentIntent();
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!selectedPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Service Type</h1>
          <Button onClick={() => setLocation("/pricing")}>
            Back to Pricing
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
              
              return (
                <div key={stepNumber} className="flex items-center">
                  <div className="flex flex-col items-center min-w-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                    </div>
                    <div className="text-center mt-2">
                      <div className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-px mx-4 ${isCompleted ? 'bg-green-500' : 'bg-border'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Package Selection */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Package</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-6 border-2 border-primary rounded-lg bg-primary/5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-xl">{selectedPackage.name}</h3>
                          <p className="text-muted-foreground mt-1">{selectedPackage.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">${basePrice}</div>
                          <div className="text-sm text-muted-foreground">Timeline: {selectedPackage.timeline}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedPackage.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Button variant="outline" onClick={() => setLocation("/pricing")}>
                        Change Package
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Add-ons */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Enhance Your Website</CardTitle>
                  <p className="text-muted-foreground">Select additional features to enhance your website</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {addons.map((addon) => (
                    <div 
                      key={addon.id} 
                      className={`p-4 border rounded-lg transition-all cursor-pointer hover:border-primary/50 ${
                        selectedAddons.includes(addon.id) ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onClick={() => handleAddonChange(addon.id, !selectedAddons.includes(addon.id))}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <Checkbox
                            id={addon.id}
                            checked={selectedAddons.includes(addon.id)}
                            onChange={() => {}} // Handled by parent div click
                          />
                          <div className="flex-1">
                            <Label htmlFor={addon.id} className="cursor-pointer">
                              <div className="font-medium">{addon.name}</div>
                              <div className="text-sm text-muted-foreground mt-1">{addon.description}</div>
                            </Label>
                          </div>
                        </div>
                        <Badge variant="outline" className="ml-4">+${addon.price}</Badge>
                      </div>
                    </div>
                  ))}
                  
                  {selectedAddons.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No add-ons selected. You can always add these later!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 3: Hosting */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Hosting Option</CardTitle>
                  <p className="text-muted-foreground">How would you like to host your website?</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(hostingOptions).map(([key, option]) => (
                    <div
                      key={key}
                      className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                        hostingType === key ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onClick={() => setHostingType(key as 'managed' | 'files_only')}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-lg">{option.name}</h4>
                            {option.badge && (
                              <Badge variant="secondary" className="text-xs">{option.badge}</Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground">{option.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">
                            {option.price === 0 ? "Free" : `$${option.price}/month`}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {option.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Step 4: Customer Info */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <p className="text-muted-foreground">We need your details to get started on your project</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="projectDetails">Project Details</Label>
                    <Textarea
                      id="projectDetails"
                      value={customerInfo.projectDetails}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, projectDetails: e.target.value }))}
                      placeholder="Tell us about your business, design preferences, and any specific requirements..."
                      rows={4}
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      This helps us understand your vision and deliver exactly what you need.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Payment */}
            {currentStep === 5 && (
              <>
                {clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm 
                      totalAmount={totalPrice} 
                      customerInfo={customerInfo}
                      orderDetails={{
                        serviceType,
                        basePrice,
                        addons: selectedAddons,
                        hostingType,
                        totalAmount: totalPrice
                      }}
                    />
                  </Elements>
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                      <p className="text-muted-foreground">Setting up secure payment...</p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              
              {currentStep < 5 && (
                <Button
                  onClick={handleNextStep}
                  className="flex items-center gap-2"
                  disabled={isLoading}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{selectedPackage.name}</span>
                  <span>${basePrice}</span>
                </div>
                
                {selectedAddons.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Add-ons:</h4>
                      {selectedAddons.map((addonId) => {
                        const addon = addons.find(a => a.id === addonId);
                        return addon ? (
                          <div key={addonId} className="flex justify-between text-sm">
                            <span>{addon.name}</span>
                            <span>+${addon.price}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </>
                )}
                
                {hostingType === 'managed' && (
                  <>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Hosting ({hostingOptions[hostingType].name})</span>
                      <span>${hostingPrice}/month</span>
                    </div>
                  </>
                )}
                
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
                
                {hostingType === 'managed' && (
                  <p className="text-xs text-muted-foreground">
                    * Hosting billed monthly after website completion
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CheckoutFormProps {
  totalAmount: number;
  customerInfo: {
    email: string;
    name: string;
    projectDetails: string;
  };
  orderDetails: {
    serviceType: string;
    basePrice: number;
    addons: string[];
    hostingType: string;
    totalAmount: number;
  };
}

function CheckoutForm({ totalAmount, customerInfo, orderDetails }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    }

    setIsProcessing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Secure Payment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!stripe || isProcessing}
            size="lg"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-background border-t-transparent rounded-full" />
                Processing Payment...
              </div>
            ) : (
              `Complete Payment - $${totalAmount}`
            )}
          </Button>
          
          <div className="text-center text-xs text-muted-foreground space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-3 h-3" />
              <span>256-bit SSL encryption</span>
            </div>
            <p>Your payment information is encrypted and secure. We'll start working on your website immediately after payment.</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}