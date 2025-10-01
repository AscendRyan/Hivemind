// src/pages/WPShell.tsx
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function WPShell() {
  // Use the global body background & variables from src/index.css.
  // Keep a full-height column so the footer sits at the bottom.
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Spacer so content starts below the fixed header */}
      <main className="flex-1 pt-28" />
      <Footer />
    </div>
  );
}
