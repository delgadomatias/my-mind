"use client";

import { NoteActions } from "@/app/actions";
import { TrashIcon } from "@/app/components/shared/icons/TrashIcon";
import EditableMarkdownEditor from "@/app/components/shared/markdown-editor/EditableMarkdownEditor";
import { Note } from "@/app/interfaces";
import { motion } from "framer-motion";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface Props {
  note: Note;
  setUpdatedNote: Dispatch<SetStateAction<Note>>;
}

export const ModalTextDetail = ({ note, setUpdatedNote }: Props) => {
  const noteLength = note.content.length;

  function handleNoteContentChange(richText: string) {
    setUpdatedNote((prev) => ({
      ...prev,
      content: richText,
    }));
  }

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
        className="flex w-full h-full p-2 transition-all duration-100 bg-white rounded-xl"
        id="backdrop-item"
      >
        <div className="absolute top-0 left-0 w-10 h-10 p-6">
          <div className="w-full h-full bg-red-500">
            <Link href={`/${note.id}?focus=true`} prefetch>
              Focus
            </Link>
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center flex-1 h-full overflow-x-hidden overflow-y-auto overscroll-behavior-y-contain scrollbar-gutter-stable"
          style={{
            scrollbarColor: "#D0D8E5 transparent",
            marginRight: noteLength > 200 ? "0.5rem" : "0",
          }}
        >
          <div className="w-full max-w-3xl max-h-full 2xl:max-w-4xl">
            <div className="py-12">
              <EditableMarkdownEditor
                content={note.content}
                onChange={handleNoteContentChange}
              />
            </div>
          </div>
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
              title="Delete card"
              onClick={handleDeleteNote}
            >
              <TrashIcon className="group-hover:fill-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
