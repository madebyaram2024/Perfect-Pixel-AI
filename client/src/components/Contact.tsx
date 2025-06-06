import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertContact } from "@shared/schema";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const faqs = [
    {
      question: "How long does it take?",
      answer: "Typically 1-2 weeks, depending on your needs.",
    },
    {
      question: "Can I host elsewhere?",
      answer: "Yes, you own the files!",
    },
    {
      question: "What's included in the base price?",
      answer: "Up to 5 pages with basic SEO and standard features.",
    },
  ];

  return (
    <section id="contact" className="py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-mono mb-8">
            CONTACT
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-8">
            Ready to start
            <br />
            <span className="text-gradient">your project?</span>
          </h2>
          <div className="border-gradient mx-auto w-24"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-card border-border text-foreground p-4 font-light"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-card border-border text-foreground p-4 font-light"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                  Phone (Optional)
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-card border-border text-foreground p-4 font-light"
                  placeholder="(123) 456-7890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                  Project Details
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-card border-border text-foreground p-4 font-light resize-none"
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              <Button
                type="submit"
                variant="outline"
                className="border border-foreground text-foreground hover:bg-foreground hover:text-background font-mono uppercase tracking-wider text-sm py-3 px-8 minimal-hover"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? "SENDING..." : "SEND MESSAGE"}
              </Button>
            </form>
          </div>

          {/* Contact Info & FAQ */}
          <div className="lg:col-span-4 space-y-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <h3 className="text-lg font-light text-foreground">Get in Touch</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                    EMAIL
                  </p>
                  <p className="text-foreground font-light">info@perfectpixelai.com</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                    PHONE
                  </p>
                  <p className="text-foreground font-light">(123) 456-7890</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                    RESPONSE TIME
                  </p>
                  <p className="text-foreground font-light">Within 24 hours</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="space-y-8">
              <h3 className="text-lg font-light text-foreground">Frequently Asked</h3>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                      {faq.question}
                    </h4>
                    <p className="text-foreground font-light">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
