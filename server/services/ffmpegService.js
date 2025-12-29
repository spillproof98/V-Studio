import { exec } from "child_process";
import { ASPECT_RATIOS } from "../shared/aspectRatio.js";

export function runFFmpeg(edit, onProgress) {
  return new Promise((resolve, reject) => {
    const output = `outputs/${Date.now()}.mp4`;

    const videoClip = edit.clips.find(
      (c) => c.track === "video"
    );

    const audioClips = edit.clips.filter(
      (c) => c.track === "audio"
    );

    if (!videoClip) {
      reject("No video clip found");
      return;
    }

    /* ---------- INPUTS ---------- */
    let inputs = `-i "${edit.video.src}"`;
    audioClips.forEach((c) => {
      inputs += ` -i "${c.src}"`;
    });

    /* ---------- VIDEO FILTER ---------- */
    const [w, h] =
      edit.aspectRatio === "9:16"
        ? [720, 1280]
        : edit.aspectRatio === "1:1"
        ? [1080, 1080]
        : [1280, 720];

    const videoFilters = `
      [0:v]
      trim=start=${videoClip.start}:end=${videoClip.end},
      setpts=PTS-STARTPTS,
      scale=${w}:${h}:force_original_aspect_ratio=decrease,
      pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2
      [v0]
    `;

    /* ---------- TEXT OVERLAYS ---------- */
    const textFilters = edit.overlays
      .map(
        (o) =>
          `drawtext=text='${o.text.replace(/:/g, "\\:")}':x=${o.x}:y=${o.y}:fontsize=${o.fontSize}:fontcolor=${o.color}:enable='between(t,${o.start},${o.end})'`
      )
      .join(",");

    const finalVideo = textFilters
      ? `[v0]${textFilters}[v]`
      : `[v0][v]`;

    /* ---------- AUDIO FILTERS ---------- */
    const audioChains = audioClips.map(
      (c, i) => `
      [${i + 1}:a]
      atrim=start=${c.start}:end=${c.end},
      asetpts=PTS-STARTPTS,
      volume=${c.volume ?? 1}
      [a${i}]
    `
    );

    const audioMix =
      audioClips.length > 0
        ? `
          ${audioChains.join("")}
          ${audioClips
            .map((_, i) => `[a${i}]`)
            .join("")}
          amix=inputs=${audioClips.length}[a]
        `
        : "";

    /* ---------- FILTER COMPLEX ---------- */
    const filterComplex = `
      ${videoFilters}
      ${finalVideo}
      ${audioMix}
    `;

    /* ---------- COMMAND ---------- */
    const cmd = `
      ffmpeg -y
      ${inputs}
      -filter_complex "${filterComplex}"
      -map "[v]"
      ${audioClips.length ? '-map "[a]"' : "-map 0:a?"}
      -pix_fmt yuv420p
      -movflags +faststart
      "${output}"
    `;

    exec(cmd, (err) => {
      if (err) {
        reject(err);
        return;
      }
      onProgress(100);
      resolve(output);
    });
  });
}
