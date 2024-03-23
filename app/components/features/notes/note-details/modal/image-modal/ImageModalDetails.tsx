"use client";

import { NoteActions } from "@/app/actions";
import { Note } from "@/app/interfaces";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { BackdropShadow } from "../../BackdropShadow";
import { SidebarModal } from "../sidebar/SidebarModal";

interface Props {
  note: Note;
  dominantColor: string;
  src: string;
}

export const ImageModalDetails = ({ note, dominantColor, src }: Props) => {
  const [updatedNote, setUpdatedNote] = useState(note);

  function handleUpdateNote() {
    if (note.title === updatedNote.title) return;
    NoteActions.updateNote(updatedNote);
  }

  return (
    <>
      <BackdropShadow onUpdateNote={handleUpdateNote} closeOnEscape />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-0 z-50 m-12"
        id="backdrop-container"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="relative flex h-full w-full rounded-xl bg-white p-2 transition-all duration-100"
          id="backdrop-item"
          style={{
            backgroundColor: dominantColor,
          }}
        >
          {/* Left side */}
          <div className="overscroll-behavior-y-contain scrollbar-gutter-stable flex h-full flex-1 flex-col items-center justify-center overflow-y-auto overflow-x-hidden">
            <Image
              alt="Image"
              height={800}
              src={src}
              width={800}
              className="aspect-square h-full max-h-full w-full max-w-full object-cover opacity-100"
              classNames={{
                wrapper: "h-[80%]",
              }}
            />
          </div>

          {/* Right side */}
          <SidebarModal note={updatedNote} setUpdatedNote={setUpdatedNote} />
        </div>
      </motion.div>
    </>
  );
};
