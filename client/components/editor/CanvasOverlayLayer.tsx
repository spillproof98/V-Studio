"use client";

import { useEditorStore } from "@/store/editorStore";
import { usePlaybackStore } from "@/store/playbackStore";
import { useRef } from "react";
import ResizeHandles from "../overlays/ResizeHandles";

export default function CanvasOverlayLayer() {
  const overlays = useEditorStore((s) => s.overlays);
  const updateOverlay = useEditorStore((s) => s.updateOverlay);
  const setSelection = useEditorStore((s) => s.setSelection);
  const currentTime = usePlaybackStore((s) => s.currentTime);

  const dragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    ox: number;
    oy: number;
  } | null>(null);

  return (
    <>
      {overlays
        .filter(
          (o) =>
            currentTime >= o.start &&
            currentTime <= o.end
        )
        .map((o) => (
          <div
            key={o.id}
            onMouseDown={(e) => {
              e.stopPropagation();
              setSelection("text", o.id);

              dragRef.current = {
                id: o.id,
                startX: e.clientX,
                startY: e.clientY,
                ox: o.x,
                oy: o.y,
              };

              const move = (ev: MouseEvent) => {
                if (!dragRef.current) return;

                const dx =
                  ev.clientX - dragRef.current.startX;
                const dy =
                  ev.clientY - dragRef.current.startY;

                updateOverlay(o.id, {
                  x: dragRef.current.ox + dx,
                  y: dragRef.current.oy + dy,
                });
              };

              const up = () => {
                dragRef.current = null;
                window.removeEventListener(
                  "mousemove",
                  move
                );
                window.removeEventListener("mouseup", up);
              };

              window.addEventListener("mousemove", move);
              window.addEventListener("mouseup", up);
            }}
            style={{
              position: "absolute",
              left: o.x,
              top: o.y,
              fontSize: o.fontSize,
              color: o.color,
              cursor: "move",
              userSelect: "none",
              pointerEvents: "auto",
              padding: 4,
              border: "1px dashed rgba(255,255,255,0.4)",
            }}
          >
            {o.text}

            {/* 🔹 RESIZE HANDLE */}
            <ResizeHandles
              onResize={(delta) =>
                updateOverlay(o.id, {
                  fontSize: Math.max(
                    10,
                    o.fontSize + delta * 0.1
                  ),
                })
              }
            />
          </div>
        ))}
    </>
  );
}
