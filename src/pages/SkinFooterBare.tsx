// src/pages/SkinFooterBare.tsx
import { useEffect } from "react";
import { Footer } from "@/components/Footer";

export default function SkinFooterBare() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.background = "transparent";
    body.style.background = "transparent";
    html.style.margin = "0";
    body.style.margin = "0";
    // let the parent page scroll; this frame is a normal block
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    // make links open the top window
    Array.from(document.querySelectorAll('a[href]')).forEach(a =>
      (a as HTMLAnchorElement).setAttribute("target", "_top")
    );
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Subtle gradient for contrast; NOT a background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.15))",
          pointerEvents: "none",
        }}
      />
      <style>{`
        footer{
          background: transparent !important;
          backdrop-filter: none !important;
          box-shadow: none !important;
          border: 0 !important;
          color: #fff !important;       /* ensure visible on dark bg */
        }
        footer a { color: #fff !important; }
      `}</style>
      <Footer />
    </div>
  );
}
