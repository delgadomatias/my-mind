import { getColorFromURL } from "color-thief-node";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { imageSrc } = await request.json();
  const dominantColor = await getColorFromURL(imageSrc);
  const toRgb = `rgb(${dominantColor.join(", ")})`;
  return NextResponse.json({ dominantColor: toRgb });
}
