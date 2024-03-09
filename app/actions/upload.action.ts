"use server";

import { CloudinaryResponse } from "@/interfaces/cloudinary-response.interface";

export async function UploadImageAction(
  form: FormData,
): Promise<CloudinaryResponse> {
  if (
    !process.env.CLOUDINARY_UPLOAD_PRESET ||
    !process.env.CLOUDINARY_API_KEY
  ) {
    throw new Error("Missing UPLOAD_PRESET and API_KEY for Cloudinary");
  }

  form.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);
  form.append("api_key", process.env.CLOUDINARY_API_KEY!);

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/md-dlg/image/upload",
    {
      method: "POST",
      body: form,
    },
  );

  return (await response.json()) as CloudinaryResponse;
}
