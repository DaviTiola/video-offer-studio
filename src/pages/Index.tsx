import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TemplatesSection from "@/components/TemplatesSection";
import PricingSection from "@/components/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="how-it-works">
          <HowItWorksSection />
        </section>
        <section id="templates">
          <TemplatesSection />
        </section>
        <section id="pricing">
          <PricingSection />
        </section>
      </main>
    </div>
  );
};

export default Index;
