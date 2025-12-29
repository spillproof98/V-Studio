"use client";

type VideoPropertiesProps = {
  duration?: number;
  width?: number;
  height?: number;
};

export default function VideoProperties({
  duration = 0,
  width = 0,
  height = 0,
}: VideoPropertiesProps) {
  return (
    <div className="editor-panel p-4 border-l border-white/10">
      <p className="font-semibold mb-3 text-sm">Video Properties</p>

      <div className="text-xs opacity-80 space-y-2">
        <div>Duration: {duration}s</div>
        <div>Resolution: {width} x {height}</div>
      </div>
    </div>
  );
}
