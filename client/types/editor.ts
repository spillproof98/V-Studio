import { Clip } from "./clip";
import { AnimatedProperty } from "./keyframe";

export type VideoAsset = {
  src: string;
  duration: number;
  width: number;
  height: number;
};

export type TextOverlay = {
  id: string;
  text: string;
  position: AnimatedProperty<{ x: number; y: number }>;
  opacity: AnimatedProperty<number>;
  start: number;
  end: number;
  fontSize: number;
  color: string;
};

export type EditorState = {
  video: VideoAsset | null;
  clips: Clip[];
  overlays: TextOverlay[];
  selected: "video" | "audio" | "text" | null;
};
