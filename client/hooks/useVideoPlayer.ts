import { RefObject, useEffect } from "react";
import { usePlaybackStore } from "@/store/playbackStore";

export function useVideoPlayer(
  ref: RefObject<HTMLVideoElement>
) {
  const playing = usePlaybackStore((s) => s.playing);

  useEffect(() => {
    if (!ref.current) return;
    playing ? ref.current.play() : ref.current.pause();
  }, [playing, ref]);
}
