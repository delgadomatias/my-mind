import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { LoadingCard } from "./LoadingCard";

interface Props {
  files: File[];
}

export const FileLoading = ({ files }: Props) => {
  const filesSrc = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);

  const isFilesNumberEven = filesSrc.length % 2 === 0;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="flex h-full gap-1 bg-white shadow-xl rounded-xl"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="grid auto-rows-auto max-w-32 rounded-xl"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(50px, 1fr))",
          gridAutoFlow: "row",
        }}
      >
        {filesSrc.map((src, index) => {
          const isFirstImage = index === 0;
          const isLastImage = index === filesSrc.length - 1;

          return (
            <Image
              src={src}
              key={index}
              width={"100%"}
              height="100%"
              alt="Test"
              className={`h-full object-cover ${isFirstImage ? "rounded-tl-xl" : ""} ${isLastImage && !isFilesNumberEven ? "rounded-bl-xl" : ""}`}
              classNames={{
                wrapper: `${!isFilesNumberEven && isLastImage ? "col-span-full" : "col-span-1"} `,
              }}
            />
          );
        })}
      </div>
      {/* <PreviewImage src={filesSrc[0]} /> */}
      <LoadingCard />
    </motion.div>
  );
};
