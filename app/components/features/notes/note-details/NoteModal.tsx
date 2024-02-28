"use client";

import MarkdownEditor from "@/components/shared/MarkdownEditor";
import { Note } from "@/interfaces/note.interface";
import { motion } from "framer-motion";

interface Props {
  note: Note;
  onNoteChange: (richText: string) => void;
}

export const NoteModal = ({ note, onNoteChange }: Props) => {
  const noteLength = note.content.length;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 m-12"
      id="backdrop-container"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="z-50 flex w-full h-full p-2 transition-all duration-100 bg-white"
        id="backdrop-item"
      >
        <div
          className="flex flex-col items-center justify-center flex-1 h-full overflow-x-hidden overflow-y-scroll overscroll-behavior-y-contain scrollbar-gutter-stable"
          style={{
            scrollbarColor: "#D0D8E5 transparent",
            marginRight: noteLength > 200 ? "0.5rem" : "0",
          }}
        >
          <div className="max-w-3xl max-h-full 2xl:max-w-4xl">
            <div className="py-12">
              <MarkdownEditor
                content={note?.content}
                editable
                onChange={onNoteChange}
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="bg-[#F0F2F5] h-full w-[400px] rounded-lg">
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
            />
          </header>
        </div>
      </div>
    </motion.div>
  );
};
