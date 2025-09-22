import { Quote, Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Andy Webb",
      position: "COO",
      company: "Super League Basketball",
      content: "HiveMind AI transformed our operations completely. Their automation solutions streamlined our league management processes, saving us countless hours and improving our fan engagement significantly. The ROI was evident within the first month.",
      rating: 5,
    },
    {
      name: "Sam Kirtikar", 
      position: "CEO",
      company: "The Mortgage Broker London",
      content: "The AI automation systems built by HiveMind revolutionized our client acquisition and processing workflows. We've seen a 300% increase in qualified leads and cut processing time by 60%. Exceptional work and ongoing support.",
      rating: 5,
    },
    {
      name: "Simon Murphy",
      position: "CEO", 
      company: "TFO Group",
      content: "HiveMind's comprehensive sales automation suite completely transformed our acquisition processes. From lead generation to conversion tracking, everything is now seamlessly automated. Our team can focus on high-value activities while the AI handles the rest.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-6 relative">
      <div className="container mx-auto">
        {/* Section Title Bubble */}
        <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6">
          <span className="text-sm font-medium text-muted-foreground">Testimonials</span>
        </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
            Client Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from the leaders who have transformed their businesses with our AI automation solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-8 relative group hover:scale-102 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
                <Quote className="h-12 w-12 text-primary" />
              </div>
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <blockquote className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                "{testimonial.content}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.position}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};