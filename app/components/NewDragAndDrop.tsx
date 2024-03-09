"use client";

import { useImageUploadContext } from "@/context/image-upload/useImageUploadContext";
import { AnimatePresence } from "framer-motion";
import { DragShadow } from "./DragShadow";
import { FileLoading } from "./features/drag-and-drop/file-loading/FileLoading";

export const NewDragAndDrop = () => {
  const { isUploading, files } = useImageUploadContext();

  return (
    <>
      <div className="fixed z-50 bottom-4 right-6">
        <AnimatePresence>
          {isUploading && <FileLoading files={files} />}
        </AnimatePresence>
      </div>
      <DragShadow />
    </>
  );
};
