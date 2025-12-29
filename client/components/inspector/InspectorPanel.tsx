"use client";

import { useEditorStore } from "@/store/editorStore";
import VideoInspector from "./VideoInspector";
import TextInspector from "./TextInspector";
import AudioInspector from "./AudioInspector";

export default function InspectorPanel() {
  const selectedType = useEditorStore((s) => s.selectedType);
  const selectedId = useEditorStore((s) => s.selectedId);

  if (!selectedType || !selectedId) {
    return (
      <div className="p-3 text-sm text-gray-400">
        Select an item to edit
      </div>
    );
  }

  return (
    <div className="p-3 space-y-4">
      {selectedType === "video" && <VideoInspector />}
      {selectedType === "text" && (
        <TextInspector overlayId={selectedId} />
      )}
      {selectedType === "audio" && (
        <AudioInspector clipId={selectedId} />
      )}
    </div>
  );
}
