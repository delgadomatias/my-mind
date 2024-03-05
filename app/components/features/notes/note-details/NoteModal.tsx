"use client";

import { TrashIcon } from "@/app/components/shared/icons/TrashIcon";
import { Note } from "@/interfaces/note.interface";
import { motion } from "framer-motion";
import { useState } from "react";
import { ModalImageDetail } from "./ModalImageDetail";
import { ModalTextDetail } from "./ModalTextDetail";

interface Props {
  note: Note;
  onNoteChange: (richText: string) => void;
  onTitleChange?: (title: string) => void;
  onDeleteNote: (id: string) => void;
  isImage: boolean;
}

export const NoteModal = ({
  isImage,
  note,
  onNoteChange,
  onTitleChange,
  onDeleteNote,
}: Props) => {
  const [title, setTitle] = useState(note.title || "");

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    onTitleChange && onTitleChange(e.target.value);
  }

  function handleNoteChange(richText: string) {
    onNoteChange(richText);
  }

  function handleDeleteNote() {
    onDeleteNote(note.id);
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 m-12"
      id="backdrop-container"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="z-50 flex w-full h-full p-2 transition-all duration-100 bg-white rounded-xl"
        id="backdrop-item"
      >
        {!isImage && (
          <ModalTextDetail onNoteChange={handleNoteChange} note={note} />
        )}
        {isImage && (
          <ModalImageDetail onNoteChange={handleNoteChange} note={note} />
        )}

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
              onChange={handleTitleChange}
              value={title}
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
