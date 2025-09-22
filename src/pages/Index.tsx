import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HexGrid } from "@/components/HexGrid";
import { TrustedBy } from "@/components/TrustedBy";
import { Solutions } from "@/components/Solutions";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
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