export function buildTrim(trim) {
  if (!trim) return "";
  return `-ss ${trim.start} -to ${trim.end}`;
}
