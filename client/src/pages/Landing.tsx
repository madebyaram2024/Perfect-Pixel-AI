import Hero from "@/components/Hero";
import ExpertiseSection from "@/components/ExpertiseSection";
import Features from "@/components/Features";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import ChatbotMascot from "@/components/ChatbotMascot";

export default function Landing() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="expertise">
        <ExpertiseSection />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>

      <section id="contact">
        <Contact />
      </section>
      
      <ChatbotMascot />
    </>
  );
}