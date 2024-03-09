import { useMemo } from "react";
import { motion } from "framer-motion";
import { PreviewImage } from "./PreviewImage";
import { LoadingCard } from "./LoadingCard";

interface Props {
  file: File;
}

export const FileLoading = ({ file }: Props) => {
  const src = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="flex items-center gap-8 bg-white rounded-xl shadow-xl"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PreviewImage src={src} />
      <LoadingCard />
    </motion.div>
  );
};