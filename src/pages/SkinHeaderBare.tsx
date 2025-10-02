// src/pages/SkinHeaderBare.tsx
import { useEffect } from "react";
import { Header } from "@/components/Header";

export default function SkinHeaderBare() {
  useEffect(() => {
    // Make the iframe page truly transparent and remove default UA margins
    const docEl = document.documentElement;
    const body = document.body;
    docEl.style.background = "transparent";
    body.style.background = "transparent";
    docEl.style.margin = "0";
    body.style.margin = "0";
    body.style.overflow = "hidden"; // prevent child scrollbars
  }, []);

  return (
    <div style={{ height: "auto" }}>
      {/* Force the header to render without background/blur/border and NOT fixed */}
      <style>{`
        header {
          position: static !important;   /* child header shouldn't be fixed; the iframe is fixed already */
          top: auto !important; left: auto !important; right: auto !important;
          background: transparent !important;
          backdrop-filter: none !important;
          box-shadow: none !important;
          border: 0 !important;
        }
      `}</style>
      <Header /* variant="bare" if you implemented it; overrides above make it safe either way */ />
    </div>
  );
}
