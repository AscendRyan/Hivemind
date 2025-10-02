// src/pages/SkinHeader.tsx
import { Header } from "@/components/Header";

export default function SkinHeader() {
  // Header renders its own fixed bar. No main/footer.
  return (
    <div className="min-h-[80px]">
      <Header />
    </div>
  );
}
