import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TemplatesSection from "@/components/TemplatesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <TemplatesSection />
      </main>
    </div>
  );
};

export default Index;
