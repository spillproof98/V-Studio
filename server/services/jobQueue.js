import { v4 as uuid } from "uuid";
import { runFFmpeg } from "./ffmpegService.js";

const jobs = {};

export function enqueueJob(editPayload) {
  const id = uuid();
  jobs[id] = { progress: 0, status: "queued" };

  setTimeout(async () => {
    jobs[id].status = "processing";

    await runFFmpeg(editPayload, (p) => {
      jobs[id].progress = p;
    });

    jobs[id].progress = 100;
    jobs[id].status = "done";
    jobs[id].output = `/outputs/${id}.mp4`;
  }, 300);

  return id;
}

export function getJob(id) {
  return jobs[id] ?? null;
}
