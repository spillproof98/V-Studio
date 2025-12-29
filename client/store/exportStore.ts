import { create } from "zustand";
import { useEditorStore } from "./editorStore";

type ExportState = {
  open: boolean;
  progress: number;
  output?: string;

  openExport: () => void;
  startExport: () => Promise<void>;
  close: () => void;
};

export const useExportStore = create<ExportState>((set) => ({
  open: false,
  progress: 0,
  output: undefined,

  openExport: () => set({ open: true }),

  startExport: async () => {
    try {
      set({ progress: 10 });

      const editorState = useEditorStore.getState();

      const res = await fetch("http://localhost:4000/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video: editorState.video,
          clips: editorState.clips,
          overlays: editorState.overlays,
          aspectRatio: editorState.aspectRatio,
        }),
      });

      if (!res.ok) throw new Error("Export failed");

      const { output } = await res.json();

      set({
        progress: 100,
        output,
      });
    } catch (err) {
      console.error(err);
      set({ progress: 0 });
      alert("Export failed. Check backend console.");
    }
  },

  close: () =>
    set({
      open: false,
      progress: 0,
      output: undefined,
    }),
}));
