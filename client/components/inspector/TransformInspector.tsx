"use client";

import Slider from "../ui/Slider";
import { useEditorStore } from "@/store/editorStore";

export default function TransformInspector() {
  const overlays = useEditorStore((s) => s.overlays);
  const updateOverlay = useEditorStore((s) => s.updateOverlay);
  const overlay = overlays[0];

  if (!overlay) return null;

  return (
    <div className="space-y-2 text-xs">
      <label>X</label>
      <Slider
        min={0}
        max={800}
        value={overlay.x}
        onChange={(e) =>
          updateOverlay(overlay.id, { x: Number(e.target.value) })
        }
      />

      <label>Y</label>
      <Slider
        min={0}
        max={600}
        value={overlay.y}
        onChange={(e) =>
          updateOverlay(overlay.id, { y: Number(e.target.value) })
        }
      />
    </div>
  );
}
