import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Mail, Phone, Building2 } from "lucide-react";

interface ContactFormProps {
  prefilledService?: string;
}

export const ContactForm = ({ prefilledService }: ContactFormProps = {}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    aiAgent: prefilledService || "",
    notes: "",
  });

  const aiAgentOptions = [
    "Sales & Lead Generation AI",
    "Customer Service ChatBot",
    "Marketing Automation AI", 
    "CRM Integration AI",
    "Document Processing AI",
    "Workflow Automation AI",
    "Data Analysis AI",
    "Custom AI Solution",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://4flajfhr.rpcld.cc/webhook/bb41e4cd-802c-48f1-90af-5ccbe6a1b4a6", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your request has been submitted. We'll get back to you within 24 hours.",
        });
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          aiAgent: "",
          notes: "",
        });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Listen for prefill service events from footer clicks
  useEffect(() => {
    const handlePrefillService = (event: CustomEvent) => {
      const serviceName = event.detail.service;
      setFormData(prev => ({ ...prev, aiAgent: serviceName }));
    };

    window.addEventListener('prefillService', handlePrefillService as EventListener);
    return () => {
      window.removeEventListener('prefillService', handlePrefillService as EventListener);
    };
  }, []);

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-4xl">
        {/* Section Title Bubble */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6">
            <span className="text-sm font-medium text-muted-foreground">Get Started</span>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started with a free consultation. Tell us about your challenges and let's build the perfect AI automation solution for you.
          </p>
        </div>

        <div className="card-3d p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="border-glow bg-input text-input-foreground"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Company Field */}
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2 text-foreground">
                  <Building2 className="h-4 w-4 text-primary" />
                  Company Name *
                </Label>
                <Input
                  id="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className="border-glow bg-input text-input-foreground"
                  placeholder="Your company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="border-glow bg-input text-input-foreground"
                  placeholder="your.email@company.com"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="border-glow bg-input text-input-foreground"
                  placeholder="+44 123 456 7890"
                />
              </div>
            </div>

            {/* AI Agent Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="aiAgent" className="text-foreground">
                What type of AI agent are you interested in? *
              </Label>
              <Select value={formData.aiAgent} onValueChange={(value) => handleChange("aiAgent", value)}>
                <SelectTrigger className="border-glow bg-input text-input-foreground">
                  <SelectValue placeholder="Select an AI solution" />
                </SelectTrigger>
                <SelectContent>
                  {aiAgentOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notes Field */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-foreground">
                Tell us about your specific needs and challenges
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                className="border-glow bg-input text-input-foreground min-h-[120px]"
                placeholder="Describe your current challenges, what processes you'd like to automate, and any specific requirements you have..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={loading || !formData.name || !formData.company || !formData.email || !formData.aiAgent}
                className="w-full button-3d text-lg py-6 group"
              >
                {loading ? "Submitting..." : "Send Request"}
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};