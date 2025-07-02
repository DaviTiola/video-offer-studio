import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Video, Menu, X, Settings, Zap, Code, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const TechNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminAccess, setShowAdminAccess] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const ADMIN_PASSWORD = "simple2024";

  const navItems = [
    { name: "Home", href: "/", icon: Zap },
    { name: "How It Works", href: "/#how-it-works", icon: Code },
    { name: "Templates", href: "/#templates", icon: Video },
    { name: "Pricing", href: "/#pricing", icon: Rocket },
  ];

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false);
    
    if (href.startsWith('/#')) {
      const element = document.getElementById(href.substring(2));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.startsWith('/')) {
      window.location.href = href;
    }
  };

  const handleGetStarted = () => {
    // Create a more engaging contact action
    const element = document.getElementById('home');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Focus on the form after scroll
      setTimeout(() => {
        const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
        if (emailInput) {
          emailInput.focus();
          emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 800);
    }
  };

  const handleAdminAccess = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      window.location.href = "/admin";
      setShowAdminAccess(false);
      setAdminPassword("");
    } else {
      alert("Senha incorreta!");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Video className="h-8 w-8 text-primary animate-glow-pulse" />
              <div className="absolute inset-0 h-8 w-8 text-accent animate-tech-float opacity-50">
                <Video className="h-8 w-8" />
              </div>
            </div>
            <span className="text-xl font-bold text-foreground bg-gradient-tech bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
              Video Offer Studio
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-primary transition-all duration-300 font-medium rounded-lg hover:bg-primary/10 group"
                >
                  <IconComponent className="h-4 w-4 group-hover:animate-tech-float" />
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="cta" onClick={handleGetStarted} className="relative overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-tech opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAdminAccess(true)}
              className="hover:shadow-tech"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors relative"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 animate-scale-in" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/20 animate-fade-in bg-gradient-glass backdrop-blur-xl rounded-b-lg">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className="flex items-center gap-3 text-left text-foreground hover:text-primary transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-primary/10"
                  >
                    <IconComponent className="h-4 w-4" />
                    {item.name}
                  </button>
                );
              })}
              <Button variant="cta" className="mt-4" onClick={handleGetStarted}>
                Get Started
              </Button>
              <Button 
                variant="ghost" 
                className="mt-2"
                onClick={() => setShowAdminAccess(true)}
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        )}

        {/* Admin Access Dialog */}
        <Dialog open={showAdminAccess} onOpenChange={setShowAdminAccess}>
          <DialogContent className="bg-card border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-foreground">Acesso Administrativo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Digite a senha..."
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminAccess()}
                className="bg-background border-primary/20"
              />
              <Button onClick={handleAdminAccess} variant="tech" className="w-full">
                Acessar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default TechNavigation;