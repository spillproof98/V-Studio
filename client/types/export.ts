export type ExportSettings = {
  format: "mp4";
  resolution: "1080p" | "720p";
  fps: number;
};

export type ExportJob = {
  id: string;
  status: "queued" | "processing" | "done" | "error";
  progress: number;
  output?: string;
};
