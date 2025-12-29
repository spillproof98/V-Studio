"use client";

import { useRef, useEffect } from "react";
import { useEditorStore } from "@/store/editorStore";
import { usePlaybackStore } from "@/store/playbackStore";
import { ASPECT_RATIOS } from "@/utils/aspectRatio";
import CanvasOverlayLayer from "./CanvasOverlayLayer";
import PlaybackControls from "./PlaybackControls";

export default function VideoCanvas() {
  const videoData = useEditorStore((s) => s.video);
  const aspectRatioKey = useEditorStore((s) => s.aspectRatio);
  const aspectRatio = ASPECT_RATIOS[aspectRatioKey];

  const { playing, setCurrentTime, setDuration } =
    usePlaybackStore();

  const ref = useRef<HTMLVideoElement>(null);

  /* ▶ Play / Pause */
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    playing ? video.play().catch(() => {}) : video.pause();
  }, [playing]);

  if (!videoData) {
    return <div className="text-gray-500">Upload a video</div>;
  }

  return (
    <div
      className="relative bg-black"
      style={{
        width: 720,
        aspectRatio, // ✅ number
      }}
    >
      <video
        ref={ref}
        src={videoData.src}
        className="absolute inset-0 w-full h-full object-contain"
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
        }}
        onTimeUpdate={(e) =>
          setCurrentTime(e.currentTarget.currentTime)
        }
        muted
      />

      <CanvasOverlayLayer />
      <PlaybackControls />
    </div>
  );
}
