// src/pages/SkinFooterBare.tsx
import { useEffect } from "react";
import { Footer } from "@/components/Footer";

export default function SkinFooterBare() {
  // Ensure the iframe is transparent
  useEffect(() => {
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";
    // Make footer links escape the iframe
    const as = Array.from(document.querySelectorAll('a[href]')) as HTMLAnchorElement[];
    as.forEach(a => a.setAttribute("target", "_top"));
  }, []);

  return (
    <div className="min-h-[120px]">
      <style>{`
        footer, .backdrop-blur-lg, .bg-background, .bg-background\\/80, .border-glow {
          background: transparent !important;
          backdrop-filter: none !important;
          box-shadow: none !important;
          border: 0 !important;
        }
      `}</style>
      <Footer /* later: variant="bare" */ />
    </div>
  );
}
