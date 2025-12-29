"use client";

import { useEditorStore } from "@/store/editorStore";
import TimelineClip from "./TimelineClip";

export default function TimelineTrack({
  type,
}: {
  type: "video" | "audio" | "text";
}) {
  const clips = useEditorStore((s) =>
    s.clips.filter((c) => c.track === type)
  );

  return (
    <div className="relative h-12 border-b border-gray-800 bg-[#11131a]">
      {clips.map((clip) => (
        <TimelineClip
          key={clip.id}
          clip={clip}
        />
      ))}
    </div>
  );
}
