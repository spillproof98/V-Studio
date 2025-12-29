"use client";

import { useEditorStore } from "@/store/editorStore";
import Slider from "../ui/Slider";
import ColorPicker from "../ui/ColorPicker";

type TextInspectorProps = {
  overlayId: string;
};

export default function TextInspector({ overlayId }: TextInspectorProps) {
  const overlay = useEditorStore((s) =>
    s.overlays.find((o) => o.id === overlayId)
  );
  const updateOverlay = useEditorStore((s) => s.updateOverlay);

  if (!overlay) {
    return (
      <div className="text-xs text-gray-400">
        Select a text layer
      </div>
    );
  }

  return (
    <div className="space-y-3 text-xs">
      <div>
        <label className="block mb-1 text-gray-400">Text</label>
        <input
          value={overlay.text}
          onChange={(e) =>
            updateOverlay(overlay.id, { text: e.target.value })
          }
          className="w-full bg-gray-800 p-1 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-400">Font Size</label>
        <Slider
          min={12}
          max={72}
          value={overlay.fontSize}
          onChange={(e) =>
            updateOverlay(overlay.id, {
              fontSize: Number(e.target.value),
            })
          }
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-400">Color</label>
        <ColorPicker
          value={overlay.color}
          onChange={(e) =>
            updateOverlay(overlay.id, { color: e.target.value })
          }
        />
      </div>
    </div>
  );
}
