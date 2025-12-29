export type ClipTrack = "video" | "audio" | "text";

export type Clip = {
  id: string;
  src: string;
  start: number;
  end: number;
  track: ClipTrack;
};
