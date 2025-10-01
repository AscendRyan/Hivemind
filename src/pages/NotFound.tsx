// src/pages/NotFound.tsx
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, Newspaper } from "lucide-react";

export default function NotFound() {
  // Page title + add a temporary <meta name="robots" content="noindex">
  useEffect(() => {
    document.title = "Page not found | HiveMind";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => { try { document.head.removeChild(meta); } catch {} };
  }, []);

  // If inside a WordPress iframe, open links at the top level
  const inIframe =
    typeof window !== "undefined" &&
    (() => { try { return window.self !== window.top; } catch { return true; } })();
  const topTarget = inIframe ? { target: "_top", rel: "noopener" } : {};

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto max-w-3xl px-6 pt-36 pb-24 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/15 text-primary text-sm font-medium mb-6">
          404 • Page not found
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">
          Oops — we can’t find that page
        </h1>

        <p className="text-muted-foreground mb-8">
          The link might be broken or the page may have moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://hivemindai.co.uk/" {...topTarget}>
            <Button className="glass-button inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go to Home
            </Button>
          </a>
          <a href="https://hivemindai.co.uk/blog" {...topTarget}>
            <Button variant="outline" className="glass-button-outline inline-flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              Visit Blog
            </Button>
          </a>
        </div>

        <div className="mt-10 text-sm text-muted-foreground">
          If you typed the address, check the spelling. Otherwise, use the links above.
        </div>
      </main>

      <Footer />
    </div>
  );
}
