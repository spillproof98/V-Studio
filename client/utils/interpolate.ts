import { Keyframe } from "../types/keyframe";

export function interpolateNumber(
  keyframes: Keyframe<number>[],
  time: number
): number {
  if (keyframes.length === 0) {
    throw new Error("No keyframes provided");
  }

  if (keyframes.length === 1) {
    return keyframes[0].value;
  }

  const sorted = [...keyframes].sort((a, b) => a.time - b.time);

  const prev = sorted.filter(k => k.time <= time).at(-1);
  const next = sorted.find(k => k.time > time);

  if (!prev) return sorted[0].value;
  if (!next) return prev.value;

  const t =
    (time - prev.time) / (next.time - prev.time);

  return prev.value + t * (next.value - prev.value);
}
