import TechNavigation from "@/components/TechNavigation";
import TechHeroSection from "@/components/TechHeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TemplatesSection from "@/components/TemplatesSection";
import PricingSection from "@/components/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TechNavigation />
      <main>
        <section id="home">
          <TechHeroSection />
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
