import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import FAQ from "@/components/FAQ";
import ChatbotMascot from "@/components/ChatbotMascot";

export default function Landing() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="value">
        <ValueProposition />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      
      <ChatbotMascot />
    </>
  );
}