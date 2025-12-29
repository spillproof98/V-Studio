"use client";

import { useState } from "react";

export default function ZoomControls() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="flex items-center gap-2 p-2 border-b border-gray-800">
      <span className="text-xs">Zoom</span>
      <input
        type="range"
        min={0.5}
        max={3}
        step={0.1}
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
      />
    </div>
  );
}
