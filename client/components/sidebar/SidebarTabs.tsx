"use client";

import { useState } from "react";
import MediaSidebar from "./MediaSidebar";
import TextSidebar from "./TextSidebar";
import AudioSidebar from "./AudioSidebar";

type Tab = "media" | "text" | "audio";

export default function SidebarTabs() {
  const [tab, setTab] = useState<Tab>("media");

  return (
    <div className="h-full flex flex-col">
      <div className="flex border-b border-gray-800">
        {(["media", "text", "audio"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs uppercase ${
              tab === t ? "bg-gray-800" : "hover:bg-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto">
        {tab === "media" && <MediaSidebar />}
        {tab === "text" && <TextSidebar />}
        {tab === "audio" && <AudioSidebar />}
      </div>
    </div>
  );
}
