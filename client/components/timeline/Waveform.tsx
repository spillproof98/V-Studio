"use client";

export default function Waveform({ src }: { src: string }) {
  return (
    <img
      src={src}
      className="w-full h-full opacity-70 pointer-events-none"
      alt="waveform"
    />
  );
}
