import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
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
        <TemplatesSection />
        <PricingSection />
      </main>
    </div>
  );
};

export default Index;
