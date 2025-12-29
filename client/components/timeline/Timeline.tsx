"use client";

import TimelineTrack from "./TimelineTrack";
import Playhead from "./Playhead";
import ZoomControls from "./ZoomControls";

export default function Timeline() {
  return (
    <div className="h-full flex flex-col text-xs text-gray-300">
      <ZoomControls />

      <div className="relative flex-1 overflow-x-auto">
        <Playhead />

        <div className="flex flex-col space-y-1 pt-4">
          <TimelineTrack type="video" />
          <TimelineTrack type="audio" />
          <TimelineTrack type="text" />
        </div>
      </div>
    </div>
  );
}
