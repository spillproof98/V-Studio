"use client";

import { useRef } from "react";

export default function ResizeHandles({
  onResize,
}: {
  onResize: (delta: number) => void;
}) {
  const startY = useRef(0);

  return (
    <div
      className="absolute right-0 bottom-0 w-3 h-3 bg-white cursor-nwse-resize"
      onMouseDown={(e) => {
        e.stopPropagation();
        startY.current = e.clientY;

        const move = (ev: MouseEvent) => {
          const delta = startY.current - ev.clientY;
          onResize(delta);
        };

        const up = () => {
          window.removeEventListener("mousemove", move);
          window.removeEventListener("mouseup", up);
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
      }}
    />
  );
}
