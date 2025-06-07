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
    },
    {
      question: "Do you use AI in your web development process?",
      answer: "Yes, we leverage AI technology to enhance our development process and content creation capabilities. Our team combines AI-powered tools with human expertise to deliver efficient, high-quality websites. AI helps us with initial content generation, design suggestions, and code optimization. However, all AI-generated content and code is reviewed, refined, and approved by our human developers before implementation."
    },
    {
      question: "What is your approval process and refund policy?",
      answer: "Our development process includes two key checkpoints for your protection: 1) First Checkpoint - We present initial design and content for your review. If you're not satisfied at this stage, you can request a full refund. 2) Final Checkpoint - After incorporating your feedback, we present the completed website. At this stage, you can request corrections but refunds are no longer available. You are responsible for reviewing all content, text, images, and functionality before giving final approval, as you'll own the website completely upon completion."
    },
    {
      question: "What should I review before approving my website?",
      answer: "Before final approval, carefully review all website content including text accuracy, contact information, business details, product descriptions, pricing, images, links functionality, contact forms, and overall design. While we use AI to assist with content generation and our human developers review everything, you are ultimately responsible for ensuring all information is correct and represents your business accurately. We recommend having multiple team members review the site before approval."
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

        {/* Important Disclaimers */}
        <div className="mt-16 p-6 bg-card border border-border rounded-lg">
          <h3 className="text-xl font-medium text-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Important Disclaimers & Policies
          </h3>
          
          <div className="flex flex-col lg:flex-row gap-6 text-sm text-muted-foreground leading-relaxed">
            {/* Left Column */}
            <div className="flex-1 space-y-4">
              <div>
                <strong className="text-foreground">AI-Assisted Development:</strong> We use artificial intelligence technology to enhance our web development process, including content generation, design optimization, and code assistance. While AI helps us deliver efficient results, all AI-generated content is reviewed and refined by our human development team. However, AI can sometimes make mistakes, so we require your careful review of all content before final approval.
              </div>
              
              <div>
                <strong className="text-foreground">Collaboration Process:</strong> Your website is built through collaboration between AI tools, professional human developers, and your feedback. We combine the efficiency of AI with human expertise and creativity to deliver high-quality results while maintaining full transparency about our process.
              </div>
            </div>
            
            {/* Right Column */}
            <div className="flex-1 space-y-4">
              <div>
                <strong className="text-foreground">Content Responsibility:</strong> You are responsible for reviewing and approving all website content, including text, images, contact information, business details, pricing, and functionality before final submission. While we review everything thoroughly, the final accuracy and appropriateness of your website content is your responsibility.
              </div>
              
              <div>
                <strong className="text-foreground">Approval Checkpoints & Refund Policy:</strong>
                <ul className="mt-2 ml-4 space-y-1">
                  <li>• <strong>First Checkpoint:</strong> Initial design and content presentation - Full refund available if not satisfied</li>
                  <li>• <strong>Final Checkpoint:</strong> Completed website presentation - Corrections available, but no refunds after this point</li>
                  <li>• Once you approve the first checkpoint, refunds are no longer available</li>
                  <li>• At final submission, you can request corrections but cannot request a refund</li>
                </ul>
              </div>
            </div>
          </div>
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