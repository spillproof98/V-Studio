"use client";

import { usePlaybackStore } from "@/store/playbackStore";

export default function StatusBar() {
  const currentTime = usePlaybackStore((s) => s.currentTime);
  const duration = usePlaybackStore((s) => s.duration);

  return (
    <div className="text-xs text-gray-400">
      {currentTime.toFixed(2)}s / {duration.toFixed(2)}s | 30fps | 1080p
    </div>
  );
}
