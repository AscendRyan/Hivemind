// src/pages/SkinFooter.tsx
import { useEffect } from "react";
import { Footer } from "@/components/Footer";

export default function SkinFooter() {
  // ensure links inside footer navigate the top window (escape iframe)
  useEffect(() => {
    const as = Array.from(document.querySelectorAll('a[href]')) as HTMLAnchorElement[];
    as.forEach(a => a.setAttribute("target", "_top"));
  }, []);

  return (
    <div className="min-h-[100px]">
      <Footer />
    </div>
  );
}
