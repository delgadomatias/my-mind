"use server";

import { CloudinaryResponse } from "../interfaces/cloudinary-response.interface";

export async function UploadImageAction(
  form: FormData
): Promise<CloudinaryResponse> {
  form.append("upload_preset", "abgtsn7m");
  form.append("api_key", "697916892814597");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/md-dlg/image/upload",
    {
      method: "POST",
      body: form,
    }
  );

  const data = (await response.json()) as CloudinaryResponse;
  return data;
}
