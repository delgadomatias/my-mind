import { writeFile } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  const data = await request.formData();
  const files = data.getAll("file") as File[];

  if (files.some((file) => file.type.split("/")[0] !== "image")) {
    return NextResponse.json(
      { error: "Al menos uno de los archivos no es una imagen" },
      { status: 400 }
    );
  }

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), "public/media", file.name);

    writeFile(filePath, buffer, (err) => {
      if (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    });
  }

  const URLS = files.map((file) => `/media/${file.name}`);
  console.log(URLS);

  return NextResponse.json({ urls: URLS });
}
