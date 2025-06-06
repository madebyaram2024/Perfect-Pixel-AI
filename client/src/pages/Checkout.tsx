import { useState, useEffect } from "react";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "wouter";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface Addon {
  id: string;
  name: string;
  price: number;
}

const addons: Addon[] = [
  { id: "ecommerce", name: "E-commerce Store", price: 299 },
  { id: "booking", name: "Booking System", price: 199 },
  { id: "menu", name: "Interactive Menu", price: 99 },
  { id: "gallery", name: "Photo Gallery", price: 149 },
  { id: "blog", name: "Blog System", price: 199 },
  { id: "contact_forms", name: "Advanced Forms", price: 99 },
  { id: "social_media", name: "Social Integration", price: 49 },
  { id: "analytics", name: "Analytics Dashboard", price: 79 },
  { id: "seo", name: "Advanced SEO", price: 199 },
  { id: "multilingual", name: "Multi-language", price: 249 },
];

const CheckoutForm = ({ orderData, onSuccess }: { orderData: any, onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/checkout?success=true',
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-mono uppercase tracking-wider"
      >
        Complete Payment
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<string>("new_website");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [hostingType, setHostingType] = useState<string>("managed");
  const [email, setEmail] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setPaymentSuccess(true);
    }
  }, []);

  const calculateTotal = () => {
    const servicePrice = serviceType === 'new_website' ? 999 : 699;
    const hostingPrice = hostingType === 'managed' ? 29 : 0;
    const addonsPrice = selectedAddons.reduce((total, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
    
    return servicePrice + hostingPrice + addonsPrice;
  };

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleContinueToPayment = async () => {
    if (!email || !projectDetails) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        serviceType,
        addons: selectedAddons.map(id => ({ id, ...addons.find(a => a.id === id) })),
        hostingType,
        email,
        projectDetails,
      };

      const response = await apiRequest("POST", "/api/create-payment-intent", orderData);
      setClientSecret(response.clientSecret);
      setStep(2);
    } catch (error) {
      toast({
        title: "Failed to create payment",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="py-32 bg-background">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-light text-foreground mb-8">Payment Successful!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. We'll be in touch within 24 hours to start your project.
          </p>
          <Link href="/">
            <Button className="font-mono uppercase tracking-wider">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-foreground mb-4">Checkout</h1>
            <p className="text-muted-foreground">Configure your project and provide details</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Service Type */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        serviceType === 'new_website' ? 'border-accent bg-accent/5' : 'border-border'
                      }`}
                      onClick={() => setServiceType('new_website')}
                    >
                      <h3 className="font-semibold">New Website</h3>
                      <p className="text-sm text-muted-foreground">$999</p>
                    </div>
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        serviceType === 'redesign' ? 'border-accent bg-accent/5' : 'border-border'
                      }`}
                      onClick={() => setServiceType('redesign')}
                    >
                      <h3 className="font-semibold">Website Redesign</h3>
                      <p className="text-sm text-muted-foreground">$699</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Add-ons */}
              <Card>
                <CardHeader>
                  <CardTitle>Add-on Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addons.map((addon) => (
                      <div 
                        key={addon.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedAddons.includes(addon.id) ? 'border-accent bg-accent/5' : 'border-border'
                        }`}
                        onClick={() => handleAddonToggle(addon.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Checkbox 
                            checked={selectedAddons.includes(addon.id)}
                            onChange={() => handleAddonToggle(addon.id)}
                          />
                          <span className="font-mono text-sm">${addon.price}</span>
                        </div>
                        <h4 className="font-semibold text-sm">{addon.name}</h4>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Hosting */}
              <Card>
                <CardHeader>
                  <CardTitle>Hosting Option</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        hostingType === 'managed' ? 'border-accent bg-accent/5' : 'border-border'
                      }`}
                      onClick={() => setHostingType('managed')}
                    >
                      <h3 className="font-semibold">Managed Hosting</h3>
                      <p className="text-sm text-muted-foreground">$29/month</p>
                    </div>
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        hostingType === 'files_only' ? 'border-accent bg-accent/5' : 'border-border'
                      }`}
                      onClick={() => setHostingType('files_only')}
                    >
                      <h3 className="font-semibold">Files Only</h3>
                      <p className="text-sm text-muted-foreground">Free</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="details">Project Requirements *</Label>
                    <Textarea
                      id="details"
                      rows={4}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>{serviceType === 'new_website' ? 'New Website' : 'Redesign'}</span>
                    <span>${serviceType === 'new_website' ? '999' : '699'}</span>
                  </div>
                  
                  {selectedAddons.map((addonId) => {
                    const addon = addons.find(a => a.id === addonId);
                    return addon ? (
                      <div key={addonId} className="flex justify-between text-sm">
                        <span>{addon.name}</span>
                        <span>${addon.price}</span>
                      </div>
                    ) : null;
                  })}
                  
                  {hostingType === 'managed' && (
                    <div className="flex justify-between text-sm">
                      <span>Managed Hosting</span>
                      <span>$29</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                    {hostingType === 'managed' && (
                      <p className="text-xs text-muted-foreground mt-1">
                        +$29/month hosting after first month
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    onClick={handleContinueToPayment}
                    disabled={loading}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-mono uppercase tracking-wider"
                  >
                    {loading ? "Processing..." : "Continue to Payment"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2 && clientSecret) {
    return (
      <div className="py-32 bg-background">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => setStep(1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Details
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-foreground mb-4">Complete Payment</h1>
            <p className="text-muted-foreground">Total: ${calculateTotal()}</p>
          </div>

          <Card>
            <CardContent className="p-8">
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm 
                  orderData={{ serviceType, selectedAddons, hostingType, email, projectDetails }}
                  onSuccess={() => setPaymentSuccess(true)}
                />
              </Elements>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-32 bg-background">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        <p className="text-muted-foreground mt-4">Setting up payment...</p>
      </div>
    </div>
  );
}