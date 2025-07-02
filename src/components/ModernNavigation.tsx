import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Menu, X, Settings } from "lucide-react";
const ModernNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminAccess, setShowAdminAccess] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const ADMIN_PASSWORD = "simple2024";
  const navItems = [{
    name: "Home",
    href: "/"
  }, {
    name: "How It Works",
    href: "/#how-it-works"
  }, {
    name: "Pricing",
    href: "/#pricing"
  }, {
    name: "Contact",
    href: "/contact"
  }];
  const handleNavigation = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('/#')) {
      const element = document.getElementById(href.substring(2));
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    } else if (href.startsWith('/')) {
      window.location.href = href;
    }
  };
  const handleGetStarted = () => {
    const element = document.getElementById('home');
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
      setTimeout(() => {
        const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
        if (emailInput) {
          emailInput.focus();
          emailInput.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
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
      alert("Incorrect password!");
    }
  };
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/lovable-uploads/13698fcd-2025-4cf3-a624-7b32e3193f72.png" alt="Simple" className="h-auto w-28 object-contain" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => <button key={item.name} onClick={() => handleNavigation(item.href)} className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
                {item.name}
              </button>)}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="cta" onClick={handleGetStarted}>
              Get Started
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowAdminAccess(true)}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-foreground hover:text-primary transition-colors">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map(item => <button key={item.name} onClick={() => handleNavigation(item.href)} className="text-left text-foreground hover:text-primary transition-colors duration-300 font-medium py-2">
                  {item.name}
                </button>)}
              <Button variant="cta" className="mt-4" onClick={handleGetStarted}>
                Get Started
              </Button>
              <Button variant="ghost" className="mt-2" onClick={() => setShowAdminAccess(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>}

        {/* Admin Access Dialog */}
        <Dialog open={showAdminAccess} onOpenChange={setShowAdminAccess}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Administrative Access</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input type="password" placeholder="Enter password..." value={adminPassword} onChange={e => setAdminPassword(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAdminAccess()} />
              <Button onClick={handleAdminAccess} variant="modern" className="w-full">
                Access
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </nav>;
};
export default ModernNavigation;