"use client";

import { useEditorStore } from "@/store/editorStore";
import { v4 as uuidv4 } from "uuid";

export default function AudioSidebar() {
  const addClip = useEditorStore((s) => s.addClip);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    addClip({
      id: uuidv4(),
      src: URL.createObjectURL(file),
      start: 0,
      end: 10,
      track: "audio",
      volume: 1,
    });
  };

  return (
    <div className="p-3">
      <input type="file" accept="audio/*" onChange={handleUpload} />
    </div>
  );
}
