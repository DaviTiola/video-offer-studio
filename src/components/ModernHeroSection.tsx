import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Video, Play, Star, Zap, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-studio.jpg";
import { useToast } from "@/hooks/use-toast";

const ModernHeroSection = () => {
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

    console.log("Lead captured:", { email, businessName });
    toast({
      title: "Welcome to Simple! 🎬",
      description: "Our professional team will contact you within 24 hours.",
    });
    
    setEmail("");
    setBusinessName("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Clean Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional Video Studio" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Text */}
          <div className="text-center lg:text-left animate-fade-in">
            
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Professional
              <span className="block text-primary">Video Production</span>
              <span className="block text-accent">in 24 Hours</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Our team of professional editors creates stunning offer videos for your business. 
              Perfect for <span className="text-primary font-semibold">supermarkets</span>, 
              <span className="text-accent font-semibold"> barber shops</span>, 
              <span className="text-primary font-semibold"> restaurants</span>, and more.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Users className="h-5 w-5 text-primary" />
                <span>Professional Team</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Zap className="h-5 w-5 text-accent" />
                <span>24h Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Award className="h-5 w-5 text-primary" />
                <span>Studio Quality</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" className="group">
                <Play className="h-5 w-5 mr-2 group-hover:animate-float" />
                View Our Templates
              </Button>
              <Button variant="outline" className="group">
                <Star className="h-5 w-5 mr-2" />
                See Portfolio
              </Button>
            </div>
          </div>

          {/* Right Column - Lead Capture */}
          <div className="animate-scale-in">
            <Card className="p-8 bg-card shadow-card border border-border hover:shadow-glow transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Get Your Free Quote
                </h3>
                <p className="text-muted-foreground">
                  Send us your requirements and get a professional video quote from our team.
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
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Professional Team</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-accent" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-primary" />
                    <span>High Quality</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHeroSection;