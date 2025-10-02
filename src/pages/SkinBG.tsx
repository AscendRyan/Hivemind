// src/pages/SkinBG.tsx
import { HexGrid } from "@/components/HexGrid";

export default function SkinBG() {
  // Only the animated background canvas (pointer-events are off in HexGrid)
  return (
    <div className="min-h-screen">
      <HexGrid />
    </div>
  );
}
