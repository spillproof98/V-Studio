export function buildScale(aspect) {
  if (aspect === "9:16") return "scale=1080:1920";
  if (aspect === "1:1") return "scale=1080:1080";
  return "scale=1920:1080";
}
