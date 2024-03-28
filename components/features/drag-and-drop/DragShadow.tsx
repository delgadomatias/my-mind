"use client";

import { useImageUploadContext } from "@/context/image-upload/useImageUploadContext";
import { AnimatePresence, motion } from "framer-motion";

export const DragShadow = () => {
  const { isDragOver } = useImageUploadContext();

  return (
    <AnimatePresence>
      {isDragOver && (
        <motion.div
          className="fixed top-0 w-full h-screen drag-shadow"
          draggable={"true"}
          style={{
            backgroundColor: isDragOver ? "rgba(0, 0, 0, 0.3)" : "transparent",
            zIndex: isDragOver ? 50 : "unset",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        ></motion.div>
      )}
    </AnimatePresence>
  );
};
