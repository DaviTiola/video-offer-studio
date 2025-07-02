import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Video, Play, Star, Zap, Cpu, Rocket, Code, Database } from "lucide-react";
import heroImage from "@/assets/hero-studio.jpg";
import { useToast } from "@/hooks/use-toast";

const TechHeroSection = () => {
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
      title: "Welcome to the Future of Video! 🚀",
      description: "Our AI-powered system will contact you within 24 hours.",
    });
    
    setEmail("");
    setBusinessName("");
  };

  const techFeatures = [
    { icon: Cpu, label: "AI-Powered", color: "text-primary" },
    { icon: Zap, label: "24h Delivery", color: "text-accent" },
    { icon: Database, label: "Cloud-Based", color: "text-primary" },
    { icon: Code, label: "Smart Templates", color: "text-accent" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Tech Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Video Studio" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
        
        {/* Animated Tech Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 gap-1 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="border border-primary/20"
                style={{
                  animation: `glow-pulse ${2 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${(i % 12) * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-tech-float opacity-60" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent rounded-full animate-tech-float opacity-80" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-primary rounded-full animate-tech-float opacity-70" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Text */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="relative">
                <Video className="h-10 w-10 text-primary animate-glow-pulse" />
                <div className="absolute inset-0 h-10 w-10 text-accent animate-tech-float opacity-50">
                  <Video className="h-10 w-10" />
                </div>
              </div>
              <span className="text-accent font-bold text-2xl bg-gradient-tech bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                Video Offer Studio
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="text-foreground">Next-Gen</span>
              <br />
              <span className="bg-gradient-tech bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                Video Studio
              </span>
              <br />
              <span className="text-primary animate-glow-pulse">Powered by AI</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Transform your business with our cutting-edge AI video platform. 
              Perfect for <span className="text-primary font-semibold">supermarkets</span>, 
              <span className="text-accent font-semibold"> barber shops</span>, 
              <span className="text-primary font-semibold"> restaurants</span>, and more.
            </p>

            {/* Tech Features Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {techFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-glass border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-tech group"
                  >
                    <IconComponent className={`h-6 w-6 ${feature.color} group-hover:animate-tech-float`} />
                    <span className="text-sm font-medium text-foreground">{feature.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" className="group">
                <Rocket className="h-5 w-5 mr-2 group-hover:animate-tech-float" />
                Explore Tech Templates
              </Button>
              <Button variant="outline" className="group">
                <Play className="h-5 w-5 mr-2 group-hover:text-primary" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Column - Lead Capture */}
          <div className="animate-scale-in">
            <Card className="p-8 bg-gradient-glass backdrop-blur-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-tech">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Cpu className="h-6 w-6 text-primary animate-glow-pulse" />
                  <h3 className="text-2xl font-bold text-foreground">
                    AI-Powered Quote
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Our smart system analyzes your needs and creates the perfect video strategy.
                </p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="h-12 text-lg bg-background/50 border-primary/20 focus:border-primary transition-all duration-300 hover:shadow-tech"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Code className="h-4 w-4 text-primary/40" />
                  </div>
                </div>

                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Business Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-lg bg-background/50 border-primary/20 focus:border-primary transition-all duration-300 hover:shadow-tech"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Database className="h-4 w-4 text-primary/40" />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="cta" 
                  className="w-full h-12 text-lg group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Rocket className="h-5 w-5 group-hover:animate-tech-float" />
                    Launch Your Video Project
                  </span>
                </Button>
              </form>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-accent" />
                    <span>AI-Powered</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>24h Delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Cpu className="h-4 w-4 text-accent" />
                    <span>Smart Tech</span>
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

export default TechHeroSection;