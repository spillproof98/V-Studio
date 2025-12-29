export function buildTextFilters(overlays = []) {
  if (!overlays.length) return "";

  return overlays
    .map(
      (o) =>
        `,drawtext=text='${o.text}':x=${o.x}:y=${o.y}:fontsize=${o.fontSize}:fontcolor=${o.color}:enable='between(t,${o.start},${o.end})'`
    )
    .join("");
}
