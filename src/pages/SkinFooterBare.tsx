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
    // remove any overflow:hidden you had here
  }, []);

  return (
    <div style={{ position: "relative", paddingBottom: "8px" }}>
      <style>{`
        footer{
          background: transparent !important;
          backdrop-filter: none !important;
          box-shadow: none !important;
          border: 0 !important;
          color: #fff !important;
        }
        footer a { color: #fff !important; }
      `}</style>
      <Footer />
    </div>
  );
}
