"use client";

import { useNoteContext } from "@/app/context/notes";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DragError } from "./drag-error/DragError";
import { FileLoading } from "./file-loading/FileLoading";
import { uploadFiles } from "./uploadFiles";

export function Dropzone() {
  const { addNote } = useNoteContext();
  const [file, setFile] = useState<File>();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      acceptedFiles.map(async (file) => {
        setFile(file);
        const form = new FormData();
        form.append("file", file);

        await uploadFiles({ addNote, form });
        setIsUploading(false);
        setTimeout(() => {
          setShowMessage(true);
        }, 500);
        setTimeout(() => {
          setShowMessage(false);
        }, 1500);
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

        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="px-6 py-2 text-xl font-medium text-white bg-green-500 rounded-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              Gotcha!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
