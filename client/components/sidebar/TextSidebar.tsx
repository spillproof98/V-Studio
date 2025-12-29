"use client";

import { useEditorStore } from "@/store/editorStore";
import { v4 as uuid } from "uuid";

export default function TextSidebar() {
  const addOverlay = useEditorStore((s) => s.addOverlay);

  return (
    <div className="p-3">
      <button
        onClick={() =>
          addOverlay({
            id: uuid(),
            text: "New Text",
            x: 100,
            y: 100,
            start: 0,
            end: 5,
            fontSize: 32,
            color: "white",
          })
        }
        className="w-full bg-purple-600 py-2 rounded text-sm"
      >
        + Add Text
      </button>
    </div>
  );
}
