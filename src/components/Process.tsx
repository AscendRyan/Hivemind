import { Search, Wrench, GraduationCap, Trophy } from "lucide-react";

export const Process = () => {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Rapid Discovery",
      description: "During the initial calls, we dive deep into challenges, set priorities and identify 'low-hanging fruit' solutions for rapid implementation alongside major projects.",
    },
    {
      icon: Wrench,
      number: "02",
      title: "Collaborative Implementation",
      description: "We always implement our solutions collaboratively alongside internal teams. We use our unique solution maps to rapidly deploy MVPs and iterate them.",
    },
    {
      icon: GraduationCap,
      number: "03",
      title: "Know How Transfer",
      description: "We provide all the tools and training necessary for your team to not only seamlessly integrate our solutions, but also to effectively leverage them for long-term success.",
    },
    {
      icon: Trophy,
      number: "04",
      title: "Competitive Advantage",
      description: "We equip you with up-to-date insights and strategic guidance that secure your competitive edge and ensure your AI & Automation strategy is continuously updated.",
    },
  ];

  return (
    <section id="process" className="py-20 px-6 relative">
      <div className="container mx-auto">
        {/* Section Title Bubble */}
        <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6">
          <span className="text-sm font-medium text-muted-foreground">Our Process</span>
        </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
            Our Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A proven methodology that ensures successful AI automation implementation and long-term success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="glass-card rounded-xl p-8 h-full text-center relative overflow-hidden">
                
                {/* Icon */}
                <div className="mb-6 relative z-10">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-4">
                    {step.title}
                  </h4>
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                  {step.description}
                </p>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform -translate-y-1/2 z-20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};