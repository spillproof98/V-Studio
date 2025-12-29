import { usePlaybackStore } from "@/store/playbackStore";

export function useTimeline() {
  const currentTime = usePlaybackStore((s) => s.currentTime);
  const duration = usePlaybackStore((s) => s.duration);

  return {
    currentTime,
    duration,
  };
}
