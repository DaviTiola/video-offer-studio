import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Video, Play, Star, Zap } from "lucide-react";
import heroImage from "@/assets/hero-studio.jpg";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const { toast } = useToast();

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !businessName) {
      toast({
        title: "Please fill in all fields",
        description: "We need your business name and email to get started.",
        variant: "destructive",
      });
      return;
    }

    // Store lead data (in a real app, this would send to backend)
    console.log("Lead captured:", { email, businessName });
    toast({
      title: "Welcome to Video Offer Studio! 🎬",
      description: "We'll contact you within 24 hours to discuss your video needs.",
    });
    
    setEmail("");
    setBusinessName("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Video Studio" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Text */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <Video className="h-8 w-8 text-accent animate-glow-pulse" />
              <span className="text-accent font-bold text-xl">Video Offer Studio</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Studio Quality
              <span className="block text-accent">Offer Videos</span>
              <span className="block text-primary-glow">in 24 Hours</span>
            </h1>

            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Transform your retail business with professional offer videos. 
              Perfect for <span className="text-accent font-semibold">supermarkets</span>, 
              <span className="text-accent font-semibold"> barber shops</span>, 
              <span className="text-accent font-semibold"> restaurants</span>, and more.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Star className="h-5 w-5 text-accent" />
                <span>Studio Quality</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Zap className="h-5 w-5 text-accent" />
                <span>24h Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Play className="h-5 w-5 text-accent" />
                <span>Ready Templates</span>
              </div>
            </div>

            <Button variant="hero" className="animate-scale-in">
              Explore Templates
            </Button>
          </div>

          {/* Right Column - Lead Capture */}
          <div className="animate-scale-in">
            <Card className="p-8 bg-card/95 backdrop-blur-sm shadow-card border-0">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Get Your Free Quote
                </h3>
                <p className="text-muted-foreground">
                  Send us your logo and offers. Get your video in 24 hours.
                </p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="h-12 text-lg"
                    required
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Business Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-lg"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="cta" 
                  className="w-full h-12 text-lg"
                >
                  Get Started Free
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  ✅ No commitment • ✅ Professional quality • ✅ Fast delivery
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;