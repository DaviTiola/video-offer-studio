import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Menu, X, Settings, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ModernNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminAccess, setShowAdminAccess] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const ADMIN_EMAIL = "davitiolafernandes@gmail.com";
  const { user, signOut } = useAuth();
  
  // Check if current user is admin
  const isAdmin = user?.email === ADMIN_EMAIL;
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
    if (isAdmin) {
      window.location.href = "/admin";
    } else {
      alert("Access denied. Admin privileges required.");
    }
  };
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/13698fcd-2025-4cf3-a624-7b32e3193f72.png" 
              alt="Simple" 
              className="h-auto w-32 object-contain" 
              style={{ marginTop: '10px' }}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => <button key={item.name} onClick={() => handleNavigation(item.href)} className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
                {item.name}
              </button>)}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Button variant="ghost" onClick={() => window.location.href = '/app/dashboard'}>
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => window.location.href = '/auth'}>
                  Sign In
                </Button>
                <Button variant="cta" onClick={handleGetStarted}>
                  Get Started
                </Button>
              </>
            )}
            {isAdmin && (
              <Button variant="ghost" size="sm" onClick={handleAdminAccess}>
                <Settings className="h-4 w-4" />
              </Button>
            )}
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
              {user ? (
                <>
                  <Button variant="ghost" className="mt-4" onClick={() => window.location.href = '/app/dashboard'}>
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="mt-2" onClick={signOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="mt-4" onClick={() => window.location.href = '/auth'}>
                    Sign In
                  </Button>
                  <Button variant="cta" className="mt-2" onClick={handleGetStarted}>
                    Get Started
                  </Button>
                </>
              )}
              {isAdmin && (
                <Button variant="ghost" className="mt-2" onClick={handleAdminAccess}>
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              )}
            </div>
          </div>}

      </div>
    </nav>;
};

export default ModernNavigation;
