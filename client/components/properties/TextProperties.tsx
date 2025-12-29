"use client";

import { useState } from "react";

export default function TextProperties() {
  const [fontSize, setFontSize] = useState(32);
  const [color, setColor] = useState("#ffffff");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);

  return (
    <div className="editor-panel p-4 border-l border-white/10">
      <p className="font-semibold mb-3 text-sm">Text Properties</p>

      <label className="block text-xs mb-1">Font Size</label>
      <input
        type="number"
        value={fontSize}
        onChange={(e) => setFontSize(+e.target.value)}
        className="w-full mb-3"
      />

      <label className="block text-xs mb-1">Color</label>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full mb-3 h-10"
      />

      <label className="block text-xs mb-1">Start Time (sec)</label>
      <input
        type="number"
        value={start}
        onChange={(e) => setStart(+e.target.value)}
        className="w-full mb-3"
      />

      <label className="block text-xs mb-1">End Time (sec)</label>
      <input
        type="number"
        value={end}
        onChange={(e) => setEnd(+e.target.value)}
        className="w-full"
      />
    </div>
  );
}
