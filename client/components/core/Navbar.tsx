"use client";

import { usePlaybackStore } from "@/store/playbackStore";
import { useHistoryStore } from "@/store/historyStore";
import { useEditorStore } from "@/store/editorStore";
import { useExportStore } from "@/store/exportStore";

export default function Navbar() {
  const toggle = usePlaybackStore((s) => s.toggle);

  const undo = useHistoryStore((s) => s.undo);
  const redo = useHistoryStore((s) => s.redo);

  const applyState = useEditorStore((s) => s.applyState);
  const openExport = useExportStore((s) => s.openExport);

  const handleUndo = () => {
    const prev = undo();
    if (prev) applyState(prev);
  };

  const handleRedo = () => {
    const next = redo();
    if (next) applyState(next);
  };

  return (
    <div className="h-12 bg-[#141414] border-b border-gray-800 flex items-center px-4 gap-4">
      <span className="font-semibold">V-Studio</span>

      <button
        onClick={toggle}
        className="text-xs bg-gray-700 px-2 py-1 rounded"
      >
        Play / Pause
      </button>

      <button
        onClick={handleUndo}
        className="text-xs bg-gray-700 px-2 py-1 rounded"
      >
        Undo
      </button>

      <button
        onClick={handleRedo}
        className="text-xs bg-gray-700 px-2 py-1 rounded"
      >
        Redo
      </button>

      <button
        onClick={openExport}
        className="ml-auto text-xs bg-blue-600 px-3 py-1 rounded"
      >
        Export
      </button>
    </div>
  );
}
