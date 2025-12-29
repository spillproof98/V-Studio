"use client";

import { useEffect, useRef } from "react";
import { useEditorStore } from "@/store/editorStore";
import { usePlaybackStore } from "@/store/playbackStore";

export default function AudioPlayer() {
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  const audioClips = useEditorStore((s) =>
    s.clips.filter((c) => c.track === "audio")
  );

  const currentTime = usePlaybackStore((s) => s.currentTime);
  const playing = usePlaybackStore((s) => s.playing);

  useEffect(() => {
  // Remove audio elements for deleted clips
  audioRefs.current.forEach((audio, id) => {
    if (!audioClips.find((c) => c.id === id)) {
      audio.pause();
      audioRefs.current.delete(id);
    }
  });

  audioClips.forEach((clip) => {
    if (!audioRefs.current.has(clip.id)) {
      const audio = new Audio(clip.src);
      audio.preload = "auto";
      audioRefs.current.set(clip.id, audio);
    }

    const audio = audioRefs.current.get(clip.id)!;
    audio.volume = clip.volume ?? 1;

    const inside =
      currentTime >= clip.start &&
      currentTime <= clip.end;

    if (!inside) {
      audio.pause();
      return;
    }

    const t = currentTime - clip.start;
    if (Math.abs(audio.currentTime - t) > 0.05) {
      audio.currentTime = t;
    }

    if (playing) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  });
}, [audioClips, currentTime, playing]);


  return null;
}
