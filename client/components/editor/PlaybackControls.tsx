"use client";

import { usePlaybackStore } from "@/store/playbackStore";

export default function PlaybackControls() {
  const toggle = usePlaybackStore((s) => s.toggle);

  return (
    <button
      onClick={toggle}
      className="absolute bottom-2 left-2 text-xs bg-black/70 px-2 py-1 rounded"
    >
      ▶ / ⏸
    </button>
  );
}
