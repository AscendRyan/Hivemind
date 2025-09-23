import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import hivemindLogo from "@/assets/hivemind-logo.png";

const BLOG_URL = "https://app.hivemindai.co.uk/blog";        // or "https://blog.hivemindai.co.uk" if you set that up
const CAREERS_URL = "https://app.hivemindai.co.uk/careers";   // keep as your app route
const HOME_URL = "https://hivemindai.co.uk/";                 // your WordPress home

// Detect if the app is running inside an iframe
const inIframe =
  typeof window !== "undefined" &&
  (() => { try { return window.self !== window.top; } catch { return true; } })();

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // If not on homepage, navigate to homepage first
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  // Helper to render external links that escape the iframe when needed
  const ExternalLink = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => (
    <a
      href={href}
      {...(inIframe ? { target: "_top", rel: "noopener" } : {})}
      className={className}
    >
      {children}
    </a>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-lg bg-background/80 border-b border-glow" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo — when embedded, go to WP home at the top level; otherwise go to app "/" */}
          {inIframe ? (
            <ExternalLink href={HOME_URL}>
              <div className="flex items-center space-x-3 cursor-pointer">
                <img src={hivemindLogo} alt="HiveMind Logo" className="h-10 w-10 object-contain" />
                <span className="text-xl font-bold text-gradient-primary">HiveMind</span>
              </div>
            </ExternalLink>
          ) : (
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
              <img src={hivemindLogo} alt="HiveMind Logo" className="h-10 w-10 object-contain" />
              <span className="text-xl font-bold text-gradient-primary">HiveMind</span>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("solutions")} className="text-foreground hover:text-primary transition-colors">
              Solutions
            </button>
            <button onClick={() => scrollToSection("process")} className="text-foreground hover:text-primary transition-colors">
              Process
            </button>
            <button onClick={() => scrollToSection("testimonials")} className="text-foreground hover:text-primary transition-colors">
              Testimonials
            </button>

            {/* Use real anchors for pages that must update the browser URL */}
            <ExternalLink href={BLOG_URL} className="text-foreground hover:text-primary transition-colors">
              Blog
            </ExternalLink>
            <ExternalLink href={CAREERS_URL} className="text-foreground hover:text-primary transition-colors">
              Careers
            </ExternalLink>

            <Button onClick={() => scrollToSection("contact")} className="glass-button">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <button onClick={() => scrollToSection("solutions")} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
              Solutions
            </button>
            <button onClick={() => scrollToSection("process")} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
              Process
            </button>
            <button onClick={() => scrollToSection("testimonials")} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
              Testimonials
            </button>

            {/* Mobile: same external links */}
            <ExternalLink href={BLOG_URL} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
              Blog
            </ExternalLink>
            <ExternalLink href={CAREERS_URL} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
              Careers
            </ExternalLink>

            <Button onClick={() => scrollToSection("contact")} className="w-full glass-button mt-4">
              Get Started
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};
