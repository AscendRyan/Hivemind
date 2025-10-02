// src/pages/SkinHeaderBare.tsx
import { useEffect } from "react";
import { Header } from "@/components/Header";

export default function SkinHeaderBare() {
  // Force a transparent page behind the header
  useEffect(() => {
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";
  }, []);

  return (
    <div className="min-h-[88px]">
      {/* Last-resort CSS overrides if your Header adds blur/borders by default */}
      <style>{`
        header, .backdrop-blur-lg, .bg-background, .bg-background\\/80, .border-glow {
          background: transparent !important;
          backdrop-filter: none !important;
          box-shadow: none !important;
          border: 0 !important;
        }
      `}</style>
      <Header /* if you later add a prop, e.g. variant="bare" */ />
    </div>
  );
}
