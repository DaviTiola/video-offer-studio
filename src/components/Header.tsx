import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Templates", href: "/templates" },
    { name: "Pricing", href: "/#pricing" }
  ];

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false);
    
    if (href.startsWith('/#')) {
      const element = document.getElementById(href.substring(2));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleBookDemo = () => {
    window.location.href = "mailto:contact@getsimpleav.com?subject=Book a Demo&body=Hi! I'd like to book a demo to see how Simple AV can help scale our video production.";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass shadow-glass">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://imgur.com/a/o3xoWqw" 
              alt="Simple AV" 
              className="h-8 w-auto"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden text-xl font-bold text-foreground ml-2">
              Simple AV
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item.name}
                </button>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button variant="cta" onClick={handleBookDemo}>
              Book a Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/20 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-left text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className="text-left text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  >
                    {item.name}
                  </button>
                )
              ))}
              <Button variant="cta" className="mt-4" onClick={handleBookDemo}>
                Book a Demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;