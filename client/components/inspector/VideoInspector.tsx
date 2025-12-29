"use client";

import { useEditorStore } from "@/store/editorStore";
import { ASPECT_RATIOS } from "@/utils/aspectRatio";

export default function VideoInspector() {
  const video = useEditorStore((s) => s.video);
  const aspectRatio = useEditorStore((s) => s.aspectRatio);
  const setAspectRatio = useEditorStore((s) => s.setAspectRatio);

  if (!video) return null;

  return (
    <div className="space-y-3 text-xs">
      {/* VIDEO INFO */}
      <div>
        Resolution: {video.width}×{video.height}
      </div>
      <div>
        Duration: {video.duration.toFixed(2)}s
      </div>

      {/* ASPECT RATIO CONTROL */}
      <div className="space-y-1">
        <label className="block text-gray-400">
          Aspect Ratio
        </label>

        <select
          value={aspectRatio}
          onChange={(e) =>
            setAspectRatio(
              e.target.value as keyof typeof ASPECT_RATIOS
            )
          }
          className="w-full bg-[#111] border border-gray-700 p-1 rounded"
        >
          {Object.keys(ASPECT_RATIOS).map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
