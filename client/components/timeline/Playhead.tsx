"use client";

import { usePlaybackStore } from "@/store/playbackStore";

export default function Playhead() {
  const currentTime = usePlaybackStore((s) => s.currentTime);
  const duration = usePlaybackStore((s) => s.duration);

  const videoSeek = (time: number) => {
    const video = document.querySelector("video");
    if (video) {
      video.currentTime = time;
    }
  };

  return (
    <input
      type="range"
      min={0}
      max={duration || 0}
      step={0.01}
      value={currentTime}
      onChange={(e) => videoSeek(Number(e.target.value))}
      className="absolute top-0 left-0 w-full z-20 cursor-pointer"
    />
  );
}
