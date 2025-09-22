import bluetokenLogo from "@/assets/bluetoken-logo.png";
import londonLionsLogo from "@/assets/london-lions-logo.png";
import tfoGroupLogo from "@/assets/tfo-group-logo.png";
import logo1 from "@/assets/logo-1.png";
import logo2 from "@/assets/logo-2.png";
import logo3 from "@/assets/logo-3.png";
import logo4 from "@/assets/logo-4.png";
import logo5 from "@/assets/logo-5.png";

export const TrustedBy = () => {
  const logos = [
    { src: bluetokenLogo, alt: "Blue Token", name: "Blue Token" },
    { src: londonLionsLogo, alt: "London Lions", name: "London Lions" },
    { src: tfoGroupLogo, alt: "TFO Group", name: "TFO Group" },
    { src: logo1, alt: "Partner Company", name: "Partner 1" },
    { src: logo2, alt: "Partner Company", name: "Partner 2" },
    { src: logo3, alt: "Partner Company", name: "Partner 3" },
    { src: logo4, alt: "Partner Company", name: "Partner 4" },
    { src: logo5, alt: "Partner Company", name: "Partner 5" },
  ];

  return (
    <section className="py-16 px-6 relative">
      {/* Section Title Bubble */}
      <div className="container mx-auto text-center mb-8">
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6">
          <span className="text-sm font-medium text-muted-foreground">Trusted By</span>
        </div>
        <p className="text-sm text-muted-foreground uppercase tracking-wider">
          Companies We've Helped Transform
        </p>
      </div>
      
      {/* Scrolling Logos Container */}
      <div className="overflow-hidden max-w-6xl mx-auto">
        <div className="flex animate-scroll-infinite">
          {/* First set of logos */}
          {logos.slice(0, 8).map((logo, index) => (
            <div 
              key={`first-${index}`} 
              className="flex-shrink-0 mx-10 opacity-70 hover:opacity-100 transition-opacity"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.slice(0, 8).map((logo, index) => (
            <div 
              key={`second-${index}`} 
              className="flex-shrink-0 mx-10 opacity-70 hover:opacity-100 transition-opacity"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};