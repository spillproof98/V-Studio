"use client";

import { useEditorStore } from "@/store/editorStore";
import TrimHandles from "./TrimHandles";

type TimelineClipProps = {
  clip: {
    id: string;
    start: number;
    end: number;
    track: "video" | "audio" | "text";
  };
};

export default function TimelineClip({ clip }: TimelineClipProps) {
  const updateClip = useEditorStore((s) => s.updateClip);
  const setSelection = useEditorStore((s) => s.setSelection);

  const PX_PER_SEC = 40;
  const left = clip.start * PX_PER_SEC;
  const width = Math.max(
  10,
  (clip.end - clip.start) * PX_PER_SEC
);


  return (
    <div
      onClick={() => setSelection(clip.track, clip.id)}
      className={`
        absolute h-8 rounded text-xs flex items-center px-2 cursor-pointer
        ${clip.track === "video" && "bg-blue-600"}
        ${clip.track === "audio" && "bg-green-600"}
        ${clip.track === "text" && "bg-purple-600"}
      `}
      style={{ left, width }}
    >
      <TrimHandles
        onStart={(delta) =>
          updateClip(clip.id, {
            start: Math.max(0, clip.start + delta),
          })
        }
        onEnd={(delta) =>
          updateClip(clip.id, {
            end: Math.max(clip.start + 0.1, clip.end + delta),
          })
        }
      />
      Clip
    </div>
  );
}
