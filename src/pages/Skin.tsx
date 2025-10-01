// src/pages/Skin.tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Skin() {
  // This page intentionally has no content.
  // It renders the same header, animated background (global styles), and footer as your app.
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Empty, transparent content area to keep spacing if needed */}
      <main className="flex-1" />
      <Footer />
    </div>
  );
}
