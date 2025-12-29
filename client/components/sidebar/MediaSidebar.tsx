"use client";

import { useEditorStore } from "@/store/editorStore";
import { getVideoMetadata } from "@/utils/videoMetadata"
import { v4 as uuid } from "uuid";

export default function MediaSidebar() {
  const setVideo = useEditorStore((s) => s.setVideo);
  const addClip = useEditorStore((s) => s.addClip);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const src = URL.createObjectURL(file);

    // ✅ READ REAL METADATA
    const { duration, width, height } =
      await getVideoMetadata(file);

    // ✅ SET MAIN VIDEO
    setVideo({
      src,
      duration,
      width,
      height,
    });

    // ✅ CREATE VIDEO CLIP FOR TIMELINE
    addClip({
      id: uuid(),
      src,
      start: 0,
      end: duration,
      track: "video",
    });
  };

  return (
    <div className="p-3 space-y-3">
      <input type="file" accept="video/*" onChange={handleUpload} />
    </div>
  );
}
