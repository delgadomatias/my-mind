"use client";

import { Note } from "@/app/interfaces";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { SidebarModal } from "./modal/sidebar/SidebarModal";

interface Props {
  dominantColor: string;
  note: Note;
  setUpdatedNote: Dispatch<SetStateAction<Note>>;
  src: string;
}

export const ModalImageDetail = ({
  dominantColor,
  note,
  setUpdatedNote,
  src,
}: Props) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 z-50 m-12"
      id="backdrop-container"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="relative flex w-full h-full p-2 transition-all duration-100 bg-white rounded-xl"
        id="backdrop-item"
        style={{
          backgroundColor: dominantColor,
        }}
      >
        {/* Modal image detail */}
        <div className="flex flex-col items-center justify-center flex-1 h-full overflow-x-hidden overflow-y-auto overscroll-behavior-y-contain scrollbar-gutter-stable">
          <Image
            alt="Image"
            height={800}
            src={src}
            width={800}
            className="object-cover w-full h-full max-w-full max-h-full opacity-100 aspect-square"
            classNames={{
              wrapper: "h-[80%]",
            }}
          />
        </div>

        {/* Right side */}
        <SidebarModal
          noteId={note.id}
          title={note.title || ""}
          setUpdatedNote={setUpdatedNote}
        />
      </div>
    </motion.div>
  );
};
