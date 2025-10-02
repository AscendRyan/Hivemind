// src/pages/SkinFooterBare.tsx
import { useEffect } from "react";
import { Footer } from "@/components/Footer";

export default function SkinFooterBare() {
  useEffect(() => {
    const docEl = document.documentElement;
    const body = document.body;
    docEl.style.background = "transparent";
    body.style.background = "transparent";
    docEl.style.margin = "0";
    body.style.margin = "0";
    body.style.overflow = "hidden"; // stop the child scrollbar
    // ensure footer links break out of the iframe
    const as = Array.from(document.querySelectorAll('a[href]')) as HTMLAnchorElement[];
    as.forEach(a => a.setAttribute("target", "_top"));
  }, []);

  return (
    <div style={{ height: "auto" }}>
      <style>{`
        footer {
          background: transparent !important;
          backdrop-filter: none !important;
          box-shadow: none !important;
          border: 0 !important;
        }
      `}</style>
      <Footer /* variant="bare" if available */ />
    </div>
  );
}
