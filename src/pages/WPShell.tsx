// src/pages/WPShell.tsx
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const css = `
/* === HiveMind app shell (scoped) === */
.hm-shell {
  --bg-1:#0a0f1c; --bg-2:#0e1527;
  --text:#e5e7eb; --muted:#a3a3a3;
  --primary:#8b5cf6; --primary2:#06b6d4;
  color:var(--text);
  min-height:100vh;
  background:
    radial-gradient(1200px 600px at 20% -10%, rgba(139,92,246,.25), transparent 60%),
    radial-gradient(1000px 500px at 100% 0%, rgba(6,182,212,.20), transparent 60%),
    linear-gradient(180deg, var(--bg-1), var(--bg-2));
  animation: hm-pan 22s ease-in-out infinite;
}
@keyframes hm-pan {
  0% { background-position: 0% 0%, 100% 0%, 50% 50%; }
  50%{ background-position: 10% -5%, 90% 5%, 50% 50%; }
  100%{background-position: 0% 0%, 100% 0%, 50% 50%; }
}
/* keep content below your fixed/glassy header */
.hm-pad-top { padding-top: 112px; }
`;

export default function WPShell() {
  return (
    <div className="hm-shell">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {/* Uses your existing Header/Footer components */}
      <Header />
      <div className="hm-pad-top" />
      <Footer />
    </div>
  );
}
