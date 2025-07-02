import ModernNavigation from "@/components/ModernNavigation";
import ModernHeroSection from "@/components/ModernHeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TemplatesSection from "@/components/TemplatesSection";
import PricingSection from "@/components/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ModernNavigation />
      <main>
        <section id="home">
          <ModernHeroSection />
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
