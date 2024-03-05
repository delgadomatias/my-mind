"use client";

import { UploadAction } from "@/app/actions/upload.action";
import { useNoteContext } from "@/app/context/notes";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export function MyDropzone() {
  const { addNote } = useNoteContext();
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);

      acceptedFiles.map(async (file) => {
        const form = new FormData();
        form.append("file", file);

        try {
          const data = await UploadAction(form);
          setIsUploading(false);

          const { secure_url, public_id, created_at } = data;
          const newNote = {
            content: "<img src=" + secure_url + " />",
            createdAt: created_at,
            id: Date.now() + public_id,
          };
          addNote(newNote);
        } catch (error) {
          console.error("Error:", error);
        }
      });
    },
    [addNote]
  );

  const { getRootProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    noClick: true,
  });

  return (
    <div {...getRootProps()} className="w-full h-screen fixed top-0">
      <div className="absolute bottom-4 right-6">
        {isUploading && (
          <div className="bg-white px-8 py-4 rounded-full border-[#B8C3D3] border-2 animate-pulse z-50">
            <h3 className="text-2xl">We&apos;re remembering the image...</h3>
          </div>
        )}
      </div>
    </div>
  );
}
