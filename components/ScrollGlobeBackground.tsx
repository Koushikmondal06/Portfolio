"use client";

import Globe from "@/components/ui/globe";

export default function ScrollGlobeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Globe />
    </div>
  );
}
