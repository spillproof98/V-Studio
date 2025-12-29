"use client";

import Navbar from "../core/Navbar";
import SidebarTabs from "../sidebar/SidebarTabs";
import InspectorPanel from "../inspector/InspectorPanel";
import VideoCanvas from "./VideoCanvas";
import Timeline from "../timeline/Timeline";
import AudioPlayer from "./AudioPlayer";
import ExportModal from "../export/ExportModal";

export default function EditorLayout() {
  return (
    <>
      <ExportModal />

      <div className="h-screen flex flex-col bg-[#0f1115] text-gray-200">
  
        <AudioPlayer />

        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 bg-[#16181f] border-r border-gray-800">
            <SidebarTabs />
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            <VideoCanvas />
          </div>

          <div className="w-72 bg-[#16181f] border-l border-gray-800">
            <InspectorPanel />
          </div>
        </div>

        <div className="h-44 bg-[#141720] border-t border-gray-800">
          <Timeline />
        </div>
      </div>
    </>
  );
}
