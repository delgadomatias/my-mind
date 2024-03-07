"use client";

import { UploadAction } from "@/app/actions/upload.action";
import { useNoteContext } from "@/app/context/notes";
import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DragError } from "./drag-error/DragError";
import { FileLoading } from "./file-loading/FileLoading";

export function MyDropzone() {
  const { addNote } = useNoteContext();
  const [isUploading, setIsUploading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [file, setFile] = useState<File>();
  const [isDragOver, setIsDragOver] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      acceptedFiles.map(async (file) => {
        setFile(file);
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
          setIsError(true);
          setIsUploading(false);
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
    onDropRejected: () => {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setIsDragOver(false);
      }, 2500);
    },
    onDropAccepted: () => {
      setIsError(false);
      setIsUploading(true);
      setIsDragOver(false);
    },
    onDragOver: () => {
      setIsDragOver(true);
    },
    onDragLeave: () => {
      setIsDragOver(false);
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="fixed top-0 w-full h-screen"
        style={{
          backgroundColor: isDragOver ? "rgba(0, 0, 0, 0.3)" : "transparent",
          zIndex: isDragOver ? 50 : "unset",
        }}
      ></div>

      <div className="fixed z-50 bottom-4 right-6">
        <AnimatePresence>
          {isUploading && file && <FileLoading file={file} />}
        </AnimatePresence>

        <AnimatePresence>{isError && <DragError />}</AnimatePresence>
      </div>
    </>
  );
}
