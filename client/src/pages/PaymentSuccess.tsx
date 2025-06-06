import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Check, Clock, Mail, Phone, Calendar, ExternalLink } from "lucide-react";

interface Order {
  id: number;
  serviceType: string;
  status: string;
  progress: number;
  progressStage: string;
  totalAmount: string;
  createdAt: string;
  addons: any[];
  hostingType: string;
  projectDetails: string;
  clientNotes: string;
}

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Get payment intent ID from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const paymentIntentId = urlParams.get('payment_intent');

  useEffect(() => {
    if (paymentIntentId) {
      fetchOrderDetails(paymentIntentId);
    } else {
      setLoading(false);
    }
  }, [paymentIntentId]);

  const fetchOrderDetails = async (intentId: string) => {
    try {
      const response = await fetch(`/api/order/${intentId}`);
      if (response.ok) {
        const orderData = await response.json();
        setOrder(orderData);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressStages = () => {
    return [
      { key: 'planning', label: 'Project Planning', description: 'Requirements analysis and project setup' },
      { key: 'design', label: 'Design Phase', description: 'Creating mockups and design concepts' },
      { key: 'development', label: 'Development', description: 'Building your website' },
      { key: 'testing', label: 'Testing & Review', description: 'Quality assurance and client review' },
      { key: 'launch', label: 'Launch', description: 'Going live and final delivery' }
    ];
  };

  const getCurrentStageIndex = () => {
    const stages = getProgressStages();
    return stages.findIndex(stage => stage.key === order?.progressStage) || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!paymentIntentId || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find your order. Please check your email for the confirmation link.
          </p>
          <Button onClick={() => setLocation("/")}>
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const stages = getProgressStages();
  const currentStageIndex = getCurrentStageIndex();

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-muted-foreground">
            Thank you for choosing PerfectPixelAI. We're excited to work on your project!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Progress */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Project Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">{order.progress}%</span>
                  </div>
                  <Progress value={order.progress} className="h-3" />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Project Stages</h4>
                  {stages.map((stage, index) => {
                    const isCompleted = index < currentStageIndex;
                    const isCurrent = index === currentStageIndex;
                    const isUpcoming = index > currentStageIndex;

                    return (
                      <div key={stage.key} className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCompleted 
                            ? 'bg-green-500 text-white' 
                            : isCurrent 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className={`font-medium ${isCurrent ? 'text-primary' : ''}`}>
                              {stage.label}
                            </h5>
                            {isCurrent && <Badge variant="secondary">Current</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{stage.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Email Confirmation</h4>
                      <p className="text-sm text-muted-foreground">
                        You'll receive a detailed project brief within 24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Kickoff Call</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll schedule a discovery call to discuss your vision
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Project Timeline</h4>
                      <p className="text-sm text-muted-foreground">
                        Regular updates on progress and milestones
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ExternalLink className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Client Portal</h4>
                      <p className="text-sm text-muted-foreground">
                        Track progress and provide feedback anytime
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Service</h4>
                  <p className="text-sm capitalize">
                    {order.serviceType.replace('_', ' ')}
                  </p>
                </div>

                {order.addons && order.addons.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Add-ons</h4>
                    <div className="space-y-1">
                      {JSON.parse(order.addons as any).map((addon: any, index: number) => (
                        <p key={index} className="text-sm text-muted-foreground">
                          {addon.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Hosting</h4>
                  <p className="text-sm capitalize">
                    {order.hostingType.replace('_', ' ')}
                  </p>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total Paid</span>
                  <span>${order.totalAmount}</span>
                </div>

                <div>
                  <Badge variant="secondary" className="w-full justify-center py-2">
                    Status: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Our team is here to support you throughout the entire process.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <a href="mailto:support@perfectpixelai.com">
                      Email Support
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setLocation("/contact")}>
                    Contact Form
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bookmark This Page */}
            <Card>
              <CardHeader>
                <CardTitle>Bookmark This Page</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Save this link to track your project progress anytime.
                </p>
                <div className="bg-muted p-3 rounded text-xs break-all">
                  {window.location.href}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}