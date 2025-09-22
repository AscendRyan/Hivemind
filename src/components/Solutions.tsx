import { TrendingUp, Users, Cog, Lightbulb, BarChart } from "lucide-react";

export const Solutions = () => {
  const solutions = [
    {
      icon: TrendingUp,
      title: "Sales &\nMarketing",
      description: "AI-based lead generation with 360 enrichment, content generation AI Bot, automated outreach, real-time dashboards, sales alerts, automated sales channel discovery.",
      color: "text-primary",
    },
    {
      icon: Users,
      title: "Customer Relationships", 
      description: "Intelligent virtual assistants, custom CRM interfaces for seamless data flow, CRM automations, sentiment analysis, loyalty triggers, auto re-engagement, AI meeting assistant.",
      color: "text-secondary",
    },
    {
      icon: Cog,
      title: "Operations & Efficiency",
      description: "Automated approvals, intelligent document processing, AI workflow design, compliance checks, unified tool setups, automated report generation, AI-assisted employee onboarding.",
      color: "text-accent",
    },
    {
      icon: Lightbulb,
      title: "Product & Innovation",
      description: "LLM-based ideation, real-time feedback, rapid prototyping, multi-format data extraction, natural language to database queries, concept visualization, AI custom interfaces from Email to WhatsApp.",
      color: "text-primary-glow",
    },
    {
      icon: BarChart,
      title: "Data &\nReporting",
      description: "No-code data pipelines, predictive forecasting, custom BI, real-time alerts, automated dashboards, anomaly detection, automated data summaries, data reformatting.",
      color: "text-secondary-glow",
    },
  ];

  return (
    <section id="solutions" className="py-20 px-6 relative">
      <div className="container mx-auto">
        {/* Section Title Bubble */}
        <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6">
          <span className="text-sm font-medium text-muted-foreground">Our Services</span>
        </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
            Low Code, High Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-world examples of how our intelligent automation has transformed businesses across industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-6 group hover:scale-102 transition-all animate-fade-in text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-current/20 to-current/10 flex items-center justify-center mb-4 ${solution.color}`}>
                  <solution.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-3 whitespace-pre-line group-hover:text-primary transition-colors">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {solution.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};