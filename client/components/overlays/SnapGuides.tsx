"use client";

export default function SnapGuides({
  showX,
  showY,
}: {
  showX: boolean;
  showY: boolean;
}) {
  return (
    <>
      {showX && (
        <div className="absolute inset-y-0 left-1/2 w-px bg-red-500 opacity-40 pointer-events-none" />
      )}
      {showY && (
        <div className="absolute inset-x-0 top-1/2 h-px bg-red-500 opacity-40 pointer-events-none" />
      )}
    </>
  );
}
