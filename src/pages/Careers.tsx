import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, Send, Mail, User, FileText } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const CANONICAL = "https://app.hivemindai.co.uk/careers";

const Careers = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
    coverLetter: "",
  });

  // simple structured data for this page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Careers — HiveMind",
    "url": CANONICAL,
    "isPartOf": {
      "@type": "WebSite",
      "name": "HiveMind",
      "url": "https://app.hivemindai.co.uk/"
    },
    "description": "Join HiveMind and help build the future of AI automation."
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert resume to base64 for JSON payload
      let resumeData: string | ArrayBuffer | null = null;
      if (formData.resume) {
        const reader = new FileReader();
        resumeData = await new Promise((resolve) => {
          reader.onload = (ev) => resolve(ev.target?.result || null);
          reader.readAsDataURL(formData.resume!);
        });
      }

      const payload = {
        type: "career_application",
        name: formData.name,
        email: formData.email,
        coverLetter: formData.coverLetter,
        resume: resumeData
          ? {
              name: formData.resume!.name,
              size: formData.resume!.size,
              type: formData.resume!.type,
              data: resumeData,
            }
          : null,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(
        "https://4flajfhr.rpcld.cc/webhook/bb41e4cd-802c-48f1-90af-5ccbe6a1b4a6",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast({
          title: "Success!",
          description:
            "Your application has been submitted. We'll review it and get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          resume: null,
          coverLetter: "",
        });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  return (
    <div className="min-h-screen">
      {/* SEO head */}
      <Helmet prioritizeSeoTags>
        <title>Careers — HiveMind</title>
        <meta
          name="description"
          content="Join HiveMind and build the future of AI automation. Explore open opportunities and submit your application."
        />
        {/* Explicit indexing signal (optional; index/follow is default) */}
        <meta name="robots" content="index,follow" />
        {/* Canonical URL best-practice for a single, stable URL */}
        <link rel="canonical" href={CANONICAL} />
        {/* Open Graph / Twitter basics */}
        <meta property="og:title" content="Careers — HiveMind" />
        <meta
          property="og:description"
          content="Join HiveMind and build the future of AI automation."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <Header />

      {/* Hero Section with Purple Gradient */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        {/* Purple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>

        {/* Floating background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full animate-float"></div>
          <div
            className="absolute top-40 right-20 w-24 h-24 bg-secondary/20 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-40 left-1/4 w-40 h-40 bg-accent/20 rounded-full animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
          <div
            className="absolute bottom-20 right-1/3 w-28 h-28 bg-primary/20 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto max-w-2xl relative z-10">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-primary">
              Join Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Help us build the future of AI automation. We're looking for
              passionate individuals to join our innovative team.
            </p>
          </div>

          {/* Application Form */}
          <div className="card-3d p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gradient-primary">
                Submit Your Application
              </h2>
              <p className="text-muted-foreground">
                Send us your resume and tell us why you'd be a great fit for
                HiveMind.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" aria-busy={loading}>
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
                  <User className="h-4 w-4 text-primary" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="border-glow bg-input text-input-foreground"
                  placeholder="Enter your full name"
                />
              </div>

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
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="border-glow bg-input text-input-foreground"
                  placeholder="your.email@example.com"
                  inputMode="email"
                  autoComplete="email"
                />
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
                <Label htmlFor="resume" className="flex items-center gap-2 text-foreground">
                  <Upload className="h-4 w-4 text-primary" />
                  Resume/CV *
                </Label>
                <div className="relative">
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    required
                    onChange={handleFileChange}
                    className="border-glow bg-input text-input-foreground file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
                  />
                  {formData.resume && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Selected: {formData.resume.name} (
                      {(formData.resume.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Accepted formats: PDF, DOC, DOCX (max 10MB)
                </p>
              </div>

              {/* Cover Letter */}
              <div className="space-y-2">
                <Label htmlFor="coverLetter" className="flex items-center gap-2 text-foreground">
                  <FileText className="h-4 w-4 text-primary" />
                  Cover Letter
                </Label>
                <Textarea
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      coverLetter: e.target.value,
                    }))
                  }
                  className="border-glow bg-input text-input-foreground min-h-[120px]"
                  placeholder="Tell us why you'd be a great fit for our team, your relevant experience, and what excites you about working with AI automation..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={
                    loading || !formData.name || !formData.email || !formData.resume
                  }
                  className="w-full button-3d text-lg py-6 group"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
