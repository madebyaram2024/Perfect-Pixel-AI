import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  // Add JSON-LD structured data for SEO
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const faqs: FAQItem[] = [
    {
      question: "How long does it take to build a website?",
      answer: "Most professional websites are completed within 7-14 business days. The timeline depends on the complexity of your project, number of pages, custom features required, and how quickly you provide feedback and content. Simple business websites typically take 5-7 days, while complex e-commerce or custom functionality projects may take 10-14 days. We provide a detailed timeline during our initial consultation and keep you updated throughout the development process."
    },
    {
      question: "Do I own my website after it's built?",
      answer: "Absolutely! You own 100% of your website including all files, code, design, content, and domain rights. We provide you with complete source code access, hosting migration assistance if needed, and full documentation. Unlike other agencies that lock you into proprietary systems, we believe in true ownership and transparency. You're never dependent on us to make changes or move your site."
    },
    {
      question: "What's included in the website price?",
      answer: "Our comprehensive website packages include custom responsive design, mobile optimization, SEO foundation setup, SSL security certificate, Google Analytics integration, contact forms, social media integration, performance optimization, cross-browser compatibility testing, and 30 days of free revisions. We also provide basic SEO meta tags, XML sitemap creation, and initial Google Search Console setup to help your website get found online."
    },
    {
      question: "Can you redesign my existing website?",
      answer: "Yes! We specialize in website redesigns and modernization. Our redesign service includes performance analysis of your current site, UX/UI improvements, mobile responsiveness upgrades, SEO optimization, speed improvements, and modern design implementation while preserving your brand identity and existing SEO rankings. We can work with any existing platform or migrate you to a better solution."
    },
    {
      question: "Do you provide hosting services?",
      answer: "Yes, we offer premium managed hosting for $25/month featuring 99.9% uptime guarantee, SSD storage, daily automated backups, SSL certificates, CDN integration, 24/7 monitoring, security scans, and expert technical support. Our hosting is optimized specifically for the websites we build. However, you're free to host your website anywhere you prefer - we provide full migration assistance."
    },
    {
      question: "Will my website work on mobile phones?",
      answer: "Absolutely! Every website we build follows mobile-first responsive design principles, ensuring perfect functionality across all devices - smartphones, tablets, laptops, and desktops. We test on multiple screen sizes and browsers including iOS Safari, Android Chrome, and mobile browsers. Mobile optimization is standard, not an add-on, because over 60% of web traffic comes from mobile devices."
    },
    {
      question: "Can you help with SEO and Google rankings?",
      answer: "Yes! SEO optimization is included in all our packages. We implement technical SEO foundations including optimized page structure, meta tags, schema markup, XML sitemaps, fast loading speeds, mobile optimization, and Google Search Console setup. For ongoing SEO and content marketing to improve rankings, we offer additional SEO packages focused on keyword research, content strategy, and monthly optimization."
    },
    {
      question: "What if I need changes after the website is done?",
      answer: "All packages include 30 days of free revisions and bug fixes after launch. For ongoing changes, we offer flexible maintenance packages starting at $75/month, or you can request changes on an hourly basis at $85/hour. We can also provide training on how to make content updates yourself using user-friendly content management systems, giving you complete control over your website."
    },
    {
      question: "Do you work with e-commerce stores and online shops?",
      answer: "Yes! We build custom e-commerce solutions with secure payment processing (Stripe, PayPal), inventory management, order tracking, customer accounts, shipping calculations, tax handling, and admin dashboards. E-commerce features start at $299 additional to base website cost. We work with platforms like Shopify, WooCommerce, or custom solutions depending on your needs and scale."
    },
    {
      question: "How much does a professional website cost?",
      answer: "Professional website pricing starts at $499 for new websites, $449 for redesigns, and $25/month for premium hosting. Final investment depends on your specific requirements, number of pages, custom features, and functionality needed. E-commerce capabilities start at $299 additional. We provide transparent, detailed quotes with no hidden fees. Most small business websites range from $499-$899 total."
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