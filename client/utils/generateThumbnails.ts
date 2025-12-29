export async function generateThumbnails(
  videoSrc: string,
  count = 8
): Promise<string[]> {
  const video = document.createElement("video");
  video.src = videoSrc;
  video.crossOrigin = "anonymous";

  await new Promise(resolve => {
    video.onloadedmetadata = resolve;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = 160;
  canvas.height = 90;

  const thumbnails: string[] = [];
  const interval = video.duration / count;

  for (let i = 0; i < count; i++) {
    video.currentTime = i * interval;

    await new Promise(resolve => {
      video.onseeked = resolve;
    });

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    thumbnails.push(canvas.toDataURL("image/png"));
  }

  return thumbnails;
}
