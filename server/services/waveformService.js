import { exec } from "child_process";

export function generateWaveform(input, output) {
  return exec(
    `ffmpeg -i ${input} -filter_complex showwavespic -s 1200x200 ${output}`
  );
}
