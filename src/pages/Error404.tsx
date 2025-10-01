// src/pages/Error404.tsx
import hivemindLogo from "@/assets/hivemind-logo.png";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Home, BookOpen } from "lucide-react";

const inIframe =
  typeof window !== "undefined" &&
  (() => { try { return window.self !== window.top; } catch { return true; } })();

const TOP_PROPS = inIframe ? { target: "_top", rel: "noopener" } : {};

export default function Error404() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-glow mb-6">
            <img src={hivemindLogo} alt="HiveMind" className="w-10 h-10 object-contain" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">
            404 — Page not found
          </h1>
          <p className="text-muted-foreground mt-4">
            The link you followed may be broken or the page may have been removed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <a href="https://hivemindai.co.uk/" {...TOP_PROPS} className="button-3d inline-flex items-center gap-2 px-4 py-2 rounded-xl">
              <Home className="h-4 w-4" /> Go to Home
            </a>
            <a href="https://hivemindai.co.uk/blog" {...TOP_PROPS} className="glass-button-outline inline-flex items-center gap-2 px-4 py-2 rounded-xl">
              <BookOpen className="h-4 w-4" /> Visit Blog
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); history.back(); }} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-primary">
              <ArrowLeft className="h-4 w-4" /> Go Back
            </a>
          </div>
        </div>
      </section>

      {/* Helpful links (optional) */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          <div className="card-3d p-6">
            <h2 className="text-xl font-semibold mb-3">Try these:</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Check the URL for typos.</li>
              <li>Use the navigation above to find what you need.</li>
              <li>Head to our <a href="https://hivemindai.co.uk/blog" {...TOP_PROPS} className="text-primary underline">Blog</a> for recent posts.</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
