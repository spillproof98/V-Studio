"use client";

import { useRef, useState } from "react";
import { useEditorStore } from "@/store/editorStore";
import type { TextOverlay as TextOverlayType } from "@/store/editorStore";
import SnapGuides from "./SnapGuides";

const SNAP_THRESHOLD = 8; // px

export default function TextOverlay({
  overlay,
}: {
  overlay: TextOverlayType;
}) {
  const update = useEditorStore((s) => s.updateOverlay);
  const setSelection = useEditorStore((s) => s.setSelection);

  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [snapX, setSnapX] = useState(false);
  const [snapY, setSnapY] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelection("text", overlay.id);

    setDragging(true);
    startPos.current = {
      x: e.clientX - overlay.x,
      y: e.clientY - overlay.y,
    };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !ref.current) return;

    const canvas = ref.current.parentElement;
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    const textRect = ref.current.getBoundingClientRect();

    let nextX = e.clientX - startPos.current.x;
    let nextY = e.clientY - startPos.current.y;

    const textCenterX = nextX + textRect.width / 2;
    const textCenterY = nextY + textRect.height / 2;

    const canvasCenterX = canvasRect.width / 2;
    const canvasCenterY = canvasRect.height / 2;

    // X snap
    if (Math.abs(textCenterX - canvasCenterX) < SNAP_THRESHOLD) {
      nextX = canvasCenterX - textRect.width / 2;
      setSnapX(true);
    } else {
      setSnapX(false);
    }

    // Y snap
    if (Math.abs(textCenterY - canvasCenterY) < SNAP_THRESHOLD) {
      nextY = canvasCenterY - textRect.height / 2;
      setSnapY(true);
    } else {
      setSnapY(false);
    }

    update(overlay.id, { x: nextX, y: nextY });
  };

  const onMouseUp = () => {
    setDragging(false);
    setSnapX(false);
    setSnapY(false);
  };

  return (
    <>
      <SnapGuides showX={snapX} showY={snapY} />

      <div
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        className={`absolute cursor-move select-none ${
          dragging ? "opacity-80" : ""
        }`}
        style={{
          left: overlay.x,
          top: overlay.y,
          fontSize: overlay.fontSize,
          color: overlay.color,
        }}
      >
        {overlay.text}
      </div>
    </>
  );
}
