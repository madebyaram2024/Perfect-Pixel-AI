import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs: FAQItem[] = [
    {
      question: "How long does it take to build a website?",
      answer: "Most websites are completed within 7-14 business days. The timeline depends on the complexity of your project and how quickly you provide feedback and content. We'll give you a specific timeline during our initial consultation."
    },
    {
      question: "Do I own my website after it's built?",
      answer: "Absolutely! You own all the files, code, and content of your website. We provide you with everything you need to maintain full control of your online presence."
    },
    {
      question: "What's included in the website price?",
      answer: "Our website packages include custom design, mobile optimization, SEO setup, SSL certificate, and 30 days of revisions. Hosting is available separately for $25/month, or you can host it anywhere you prefer."
    },
    {
      question: "Can you redesign my existing website?",
      answer: "Yes! We specialize in modernizing existing websites. Our redesign service improves performance, mobile responsiveness, and user experience while maintaining your brand identity."
    },
    {
      question: "Do you provide hosting services?",
      answer: "Yes, we offer reliable hosting for $25/month with 99.9% uptime, SSL certificates, daily backups, and 24/7 support. You can also host your website with any provider you prefer."
    },
    {
      question: "Will my website work on mobile phones?",
      answer: "Absolutely! Every website we build is fully responsive and optimized for all devices - smartphones, tablets, and desktops. Mobile-first design is standard in all our projects."
    },
    {
      question: "Can you help with SEO and Google rankings?",
      answer: "Yes! Basic SEO optimization is included in all our packages. This includes meta tags, site structure, and performance optimization to help your website rank better in search results."
    },
    {
      question: "What if I need changes after the website is done?",
      answer: "All packages include 30 days of free revisions. After that, we offer maintenance packages or can teach you how to make simple updates yourself using our user-friendly content management system."
    },
    {
      question: "Do you work with e-commerce stores?",
      answer: "Yes! We can build custom e-commerce solutions with payment processing, inventory management, and order tracking. E-commerce functionality is available as an add-on to any package."
    },
    {
      question: "How much does a website cost?",
      answer: "New websites start at $499, redesigns at $449, and hosting at $25/month. Final pricing depends on your specific needs and features. Contact us for a detailed quote tailored to your project."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-24 bg-card/20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8 text-accent" />
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our web design services, 
            pricing, and process.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index}
              className="border-border hover:border-accent/30 transition-all duration-300"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-accent/5 transition-colors duration-300"
                >
                  <h3 className="text-lg font-medium text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-accent" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-5">
                    <div className="border-t border-border pt-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-black px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}