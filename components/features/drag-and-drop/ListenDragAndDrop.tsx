"use client";

import { useImageUploadContext } from "@/context/image-upload/useImageUploadContext";
import { AnimatePresence } from "framer-motion";
import { DragShadow } from "./DragShadow";
import { FileLoading } from "./file-loading/FileLoading";

export const ListenDragAndDrop = () => {
  const { isUploading, files, isError } = useImageUploadContext();

  return (
    <>
      <div className="fixed bottom-4 right-6 z-50">
        <AnimatePresence>
          {isUploading && !isError && <FileLoading files={files} />}
        </AnimatePresence>
      </div>
      <DragShadow />
    </>
  );
};
