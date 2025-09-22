import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HexGrid } from "@/components/HexGrid";
import { TrustedBy } from "@/components/TrustedBy";
import { Solutions } from "@/components/Solutions";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

// NEW: SEO head manager
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* SEO head for the homepage */}
      <Helmet>
        {/* Title: clear, branded, human-readable */}
        <title>HiveMind — AI automation & solutions for growth</title>

        {/* Meta description: unique, concise summary of the page */}
        <meta
          name="description"
          content="HiveMind builds practical AI automation, strategy, and custom tools to help teams scale faster. Book a discovery call."
        />

        {/* Canonical: the preferred URL for this page */}
        <link rel="canonical" href="https://app.hivemindai.co.uk/" />

        {/* Open Graph / Twitter (nice previews when shared) */}
        <meta property="og:title" content="HiveMind — AI automation & solutions for growth" />
        <meta
          property="og:description"
          content="Practical AI automation, strategy, and custom tools to help your team scale."
        />
        <meta property="og:url" content="https://app.hivemindai.co.uk/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Header />
      <Hero />
      <Solutions />
      <TrustedBy />
      <Process />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
