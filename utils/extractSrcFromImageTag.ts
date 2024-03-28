export function extractSrcFromImageTag(imgTag: string) {
  const regex = /src=([^ ]*)/;
  const match = imgTag.match(regex);
  return match ? match[1] : null;
}
