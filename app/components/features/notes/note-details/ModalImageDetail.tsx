"use client";

import { NoteActions } from "@/app/actions";
import { TrashIcon } from "@/app/components/shared/icons/TrashIcon";
import { Note } from "@/app/interfaces";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

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
  function handleNoteTitleChange(title: string) {
    setUpdatedNote((prev) => ({
      ...prev,
      title,
    }));
  }

  async function handleDeleteNote() {
    await NoteActions.deleteNote(note.id);
  }

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
            className="object-cover w-full h-full max-w-full max-h-full aspect-square"
            classNames={{
              wrapper: "h-[80%]",
            }}
          />
        </div>

        {/* Right side */}
        <div className="bg-[#F0F2F5] h-full w-[400px] rounded-lg flex flex-col justify-between">
          <header
            className="h-24 py-5 rounded-lg rounded-bl-none rounded-br-none px-7"
            style={{
              background:
                "linear-gradient(180deg, #D1D9E6 0%, #EAEDF1 105%, #EAEDF1 105%)",
            }}
          >
            <input
              type="text"
              placeholder="Title goes here"
              className="text-[#505864] bg-transparent w-full text-ellipsis border-none text-3xl font-light focus:outline-none focus:text-black"
              onChange={(e) => handleNoteTitleChange(e.target.value)}
              value={note.title}
            />
          </header>

          <div className="flex items-center justify-center w-full p-5">
            <button
              className="p-3 bg-white rounded-full hover:bg-[#748297] group transition-all ease-linear"
              onClick={handleDeleteNote}
              title="Delete card"
            >
              <TrashIcon className="group-hover:fill-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
