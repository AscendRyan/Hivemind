import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import hivemindLogo from "@/assets/hivemind-logo.png";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // If not on homepage, navigate to homepage first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'backdrop-blur-lg bg-background/80 border-b border-glow' 
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
              <img 
                src={hivemindLogo} 
                alt="HiveMind Logo" 
                className="h-10 w-10 object-contain"
              />
            <span className="text-xl font-bold text-gradient-primary">
              HiveMind
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("solutions")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Solutions
            </button>
            <button 
              onClick={() => scrollToSection("process")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection("testimonials")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => navigateToPage("/blog")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => navigateToPage("/careers")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Careers
            </button>
            <Button 
              onClick={() => scrollToSection("contact")}
              className="glass-button"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <button 
              onClick={() => scrollToSection("solutions")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Solutions
            </button>
            <button 
              onClick={() => scrollToSection("process")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => navigateToPage("/blog")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => navigateToPage("/careers")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Careers
            </button>
            <Button 
              onClick={() => scrollToSection("contact")}
              className="w-full glass-button mt-4"
            >
              Get Started
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};