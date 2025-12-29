"use client";

export default function TrimHandles({
  onStart,
  onEnd,
}: {
  onStart: (delta: number) => void;
  onEnd: (delta: number) => void;
}) {
  const startDrag = (
    e: React.MouseEvent,
    cb: (d: number) => void
  ) => {
    e.stopPropagation();
    const startX = e.clientX;

    const move = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      cb(dx / 40); // 40px = 1 second
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  return (
    <>
      {/* START HANDLE */}
      <div
        className="absolute left-0 top-0 w-2 h-full cursor-ew-resize bg-white/40"
        onMouseDown={(e) => startDrag(e, onStart)}
      />

      {/* END HANDLE */}
      <div
        className="absolute right-0 top-0 w-2 h-full cursor-ew-resize bg-white/40"
        onMouseDown={(e) => startDrag(e, onEnd)}
      />
    </>
  );
}
