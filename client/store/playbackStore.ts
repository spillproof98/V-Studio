import { create } from "zustand";

type PlaybackState = {
  currentTime: number;
  duration: number;
  playing: boolean;

  setCurrentTime: (t: number) => void;
  setDuration: (d: number) => void;

  play: () => void;
  pause: () => void;
  toggle: () => void;
};

export const usePlaybackStore = create<PlaybackState>((set) => ({
  currentTime: 0,
  duration: 0,
  playing: false,

  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),

  play: () => set({ playing: true }),
  pause: () => set({ playing: false }),
  toggle: () => set((s) => ({ playing: !s.playing })),
}));
