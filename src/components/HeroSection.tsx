import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const handleRequestDemo = () => {
    window.location.href = "mailto:contact@getsimpleav.com?subject=Request Free Demo&body=Hi! I'd like to request a free demo to see how Simple AV can help scale our video production.";
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/api/placeholder/1920/1080" type="video/mp4" />
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto fade-in-up">
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            High-Performance Video.
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Scaled for Growth.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            We produce studio-quality video assets that convert. Our system is built for the speed and scale that modern DNVBs and retailers demand.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleRequestDemo}
              className="min-w-[200px]"
            >
              Request a Free Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Link to="/templates">
              <Button 
                variant="outline" 
                size="lg"
                className="min-w-[200px] border-2"
              >
                <Play className="mr-2 h-5 w-5" />
                See Our Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;