import { Brain, Mail, Linkedin, Twitter } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import hivemindLogo from "@/assets/hivemind-logo.png";
import { CalendarBooking } from "./CalendarBooking";

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToContactWithService = (serviceName: string) => {
    // If not on homepage, navigate to homepage first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll and trigger service selection
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
          // Trigger custom event to prefill service
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('prefillService', { 
              detail: { service: serviceName } 
            }));
          }, 500);
        }
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        // Trigger custom event to prefill service
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('prefillService', { 
            detail: { service: serviceName } 
          }));
        }, 500);
      }
    }
  };
  return (
    <footer className="py-12 px-6 border-t border-border bg-muted/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={hivemindLogo} 
                alt="HiveMind Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold text-gradient-primary">
                HiveMind
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Transforming businesses through intelligent AI automation solutions. 
              From lead generation to workflow optimization, we make AI work for you.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:ryan@hivemindai.co.uk"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              >
                <Mail className="h-5 w-5 text-primary" />
              </a>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Linkedin className="h-5 w-5 text-primary" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Twitter className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li 
                className="hover:text-primary transition-colors cursor-pointer"
                onClick={() => scrollToContactWithService("Sales & Lead Generation AI")}
              >
                AI Lead Generation
              </li>
              <li 
                className="hover:text-primary transition-colors cursor-pointer"
                onClick={() => scrollToContactWithService("Marketing Automation AI")}
              >
                Marketing Automation
              </li>
              <li 
                className="hover:text-primary transition-colors cursor-pointer"
                onClick={() => scrollToContactWithService("CRM Integration AI")}
              >
                CRM Integration
              </li>
              <li 
                className="hover:text-primary transition-colors cursor-pointer"
                onClick={() => scrollToContactWithService("Workflow Automation AI")}
              >
                Workflow Optimization
              </li>
              <li 
                className="hover:text-primary transition-colors cursor-pointer"
                onClick={() => scrollToContactWithService("Custom AI Solution")}
              >
                Custom AI Solutions
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Ready to transform your business?</p>
              <CalendarBooking />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2024 HiveMind. All rights reserved. | Transforming businesses through intelligent automation.</p>
          <p className="mt-2">Contact us: <a href="mailto:ryan@hivemindai.co.uk" className="text-primary hover:underline">ryan@hivemindai.co.uk</a></p>
        </div>
      </div>
    </footer>
  );
};