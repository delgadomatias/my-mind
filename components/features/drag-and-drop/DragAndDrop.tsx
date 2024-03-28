"use client";

import { useImageUploadContext } from "@/context/image-upload/useImageUploadContext";
import { AnimatePresence } from "framer-motion";
import { DragShadow } from "./DragShadow";
import { DragError } from "./drag-error/DragError";
import { FileLoading } from "./file-loading/FileLoading";

export const DragAndDrop = () => {
  const { isUploading, files, isError } = useImageUploadContext();

  return (
    <>
      <div className="fixed z-50 bottom-4 right-6">
        <AnimatePresence>
          {isUploading && !isError && <FileLoading files={files} />}
        </AnimatePresence>
        <AnimatePresence>{isError && <DragError />}</AnimatePresence>
      </div>
      <DragShadow />
    </>
  );
};
