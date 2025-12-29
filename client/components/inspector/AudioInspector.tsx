"use client";

import { useEditorStore } from "@/store/editorStore";
import Slider from "../ui/Slider";

type AudioInspectorProps = {
  clipId: string;
};

export default function AudioInspector({ clipId }: AudioInspectorProps) {
  const clip = useEditorStore((s) =>
    s.clips.find((c) => c.id === clipId)
  );
  const updateClip = useEditorStore((s) => s.updateClip);

  if (!clip) {
    return (
      <div className="text-xs text-gray-400">
        Audio clip not found
      </div>
    );
  }

  return (
    <div className="space-y-2 text-xs">
      <label className="block text-gray-400">Volume</label>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={clip.volume ?? 1}
        onChange={(e) =>
          updateClip(clip.id, {
            volume: Number(e.target.value),
          })
        }
      />
    </div>
  );
}
