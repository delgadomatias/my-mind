"use server";

import { getColorFromURL } from "color-thief-node";

export async function getDominantColor(imageSrc: string) {
  const dominantColor = await getColorFromURL(imageSrc);
  const toRgb = `rgb(${dominantColor.join(", ")})`;
  return toRgb;
}
