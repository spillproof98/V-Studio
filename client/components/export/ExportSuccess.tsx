"use client";

export default function ExportSuccess({ url }: { url: string }) {
  return (
    <div className="p-4 bg-[#141414] rounded text-sm">
      <div className="mb-2">Export completed 🎉</div>
      <a
        href={url}
        download
        className="text-blue-400 underline"
      >
        Download video
      </a>
    </div>
  );
}
