import { create } from "zustand";
import { useHistoryStore } from "./historyStore";

export type ClipTrack = "video" | "audio" | "text";
export type AspectRatio = "16:9" | "9:16" | "1:1";

export type Clip = {
  id: string;
  src: string;
  start: number;
  end: number;
  track: ClipTrack;
  volume?: number;
};

export type TextOverlay = {
  id: string;
  text: string;
  x: number;
  y: number;
  start: number;
  end: number;
  fontSize: number;
  color: string;
};

export type VideoAsset = {
  src: string;
  duration: number;
  width: number;
  height: number;
};

export type SelectionType = "video" | "audio" | "text" | null;

export type EditorSnapshot = {
  video: VideoAsset | null;
  clips: Clip[];
  overlays: TextOverlay[];
  aspectRatio: AspectRatio;
  selectedType: SelectionType;
  selectedId: string | null;
};

export type EditorState = EditorSnapshot & {
  setSelection: (t: SelectionType, id: string | null) => void;
  setAspectRatio: (r: AspectRatio) => void;
  setVideo: (v: VideoAsset) => void;
  addClip: (c: Clip) => void;
  updateClip: (id: string, data: Partial<Clip>) => void;
  addOverlay: (o: TextOverlay) => void;
  updateOverlay: (id: string, data: Partial<TextOverlay>) => void;
  applyState: (s: EditorSnapshot) => void;
};

export const useEditorStore = create<EditorState>((set, get) => ({
  video: null,
  clips: [],
  overlays: [],
  aspectRatio: "16:9",
  selectedType: null,
  selectedId: null,

  /* ---------- helpers ---------- */

  applyState: (snapshot) =>
    set(() => ({
      ...snapshot,
      setSelection: get().setSelection,
      setAspectRatio: get().setAspectRatio,
      setVideo: get().setVideo,
      addClip: get().addClip,
      updateClip: get().updateClip,
      addOverlay: get().addOverlay,
      updateOverlay: get().updateOverlay,
      applyState: get().applyState,
    })),

  /* ---------- actions ---------- */

  setSelection: (type, id) =>
    set({ selectedType: type, selectedId: id }),

  setAspectRatio: (aspectRatio) =>
    set((s) => {
      const snapshot: EditorSnapshot = {
        ...s,
        aspectRatio,
      };
      useHistoryStore.getState().set(snapshot);
      return snapshot;
    }),

  setVideo: (video) =>
    set((s) => {
      const mainClip: Clip = {
        id: "main-video",
        src: video.src,
        start: 0,
        end: video.duration, // ✅ REAL DURATION
        track: "video",
      };

      const snapshot: EditorSnapshot = {
        video,
        clips: [mainClip],
        overlays: [],
        aspectRatio: s.aspectRatio,
        selectedType: "video",
        selectedId: mainClip.id,
      };

      useHistoryStore.getState().set(snapshot);
      return snapshot;
    }),

  addClip: (clip) =>
    set((s) => {
      const snapshot: EditorSnapshot = {
        ...s,
        clips: [...s.clips, clip],
      };
      useHistoryStore.getState().set(snapshot);
      return snapshot;
    }),

  updateClip: (id, data) =>
    set((s) => {
      const snapshot: EditorSnapshot = {
        ...s,
        clips: s.clips.map((c) =>
          c.id === id ? { ...c, ...data } : c
        ),
      };
      useHistoryStore.getState().set(snapshot);
      return snapshot;
    }),

  addOverlay: (overlay) =>
    set((s) => {
      const snapshot: EditorSnapshot = {
        ...s,
        overlays: [...s.overlays, overlay],
      };
      useHistoryStore.getState().set(snapshot);
      return snapshot;
    }),

  updateOverlay: (id, data) =>
    set((s) => {
      const snapshot: EditorSnapshot = {
        ...s,
        overlays: s.overlays.map((o) =>
          o.id === id ? { ...o, ...data } : o
        ),
      };
      useHistoryStore.getState().set(snapshot);
      return snapshot;
    }),
}));
