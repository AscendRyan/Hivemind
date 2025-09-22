import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import hexgridNetwork from "@/assets/hexgrid-ai-network-new.png";

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-end justify-center px-6 pt-40 pb-32 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 opacity-10" style={{ zIndex: 2 }}>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/10 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-accent/10 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-primary/10 rounded-full animate-float" style={{ animationDelay: "0.5s" }}></div>
      </div>
      <div className="container mx-auto text-center relative" style={{ zIndex: 10 }}>
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Transform Your Business with AI Automation
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We build intelligent automation systems that revolutionize your business processes, 
            from AI-powered lead generation to complete workflow optimization.
          </p>

          <div className="flex justify-center items-center mb-12">
            <Button 
              onClick={scrollToContact}
              className="glass-button text-lg px-8 py-4 group"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex justify-center mt-16">
            <div className="animate-float">
              <img 
                src={hexgridNetwork} 
                alt="AI Agents Network Visualization" 
                className="max-w-2xl w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};