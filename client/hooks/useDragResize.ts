import { useRef } from "react";

export function useDragResize(
  onUpdate: (x: number, y: number) => void
) {
  const start = useRef<{ x: number; y: number } | null>(
    null
  );

  const onMouseDown = (e: React.MouseEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!start.current) return;
    onUpdate(e.clientX - start.current.x, e.clientY - start.current.y);
  };

  const onMouseUp = () => {
    start.current = null;
  };

  return { onMouseDown, onMouseMove, onMouseUp };
}
