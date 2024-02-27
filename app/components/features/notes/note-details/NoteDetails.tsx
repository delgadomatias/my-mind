"use client";

import { useNoteContext } from "@/app/context/notes";
import { Note, NoteId } from "@/app/interfaces";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { BackdropShadow } from "./BackdropShadow";

interface Props {
  noteId: NoteId;
}

const MarkdownEditor = dynamic(
  () => import("@/app/components/shared/MarkdownEditor"),
  {
    ssr: false,
  }
);

export const NoteDetails = ({ noteId }: Props) => {
  const { notes, updateNote, deleteNote } = useNoteContext();
  const note = useMemo(
    () => notes.find((n) => n.id === noteId),
    [notes, noteId]
  );
  const [updatedNote, setUpdatedNote] = useState(note as Note);

  function onUpdateNote() {
    if (updatedNote.content == "<p></p>") {
      deleteNote(updatedNote.id);
      return;
    }

    if (!note) return;
    if (note.content === updatedNote.content) return;

    updateNote(updatedNote);
  }

  function onNoteChange(richText: string) {
    setUpdatedNote({
      ...updatedNote,
      content: richText,
    });
  }

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    window.scrollTo(0, 0);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  if (!note) return;

  const noteLength = note.content.length;

  return (
    <div>
      {/* Shadow for background and close the card */}
      <BackdropShadow onUpdateNote={onUpdateNote} />

      {/* The modal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="m-12 absolute inset-0"
        id="backdrop-container"
      >
        <div
          className="bg-white h-full w-full z-50 transition-all duration-100 flex p-2"
          id="backdrop-item"
        >
          <div
            className="flex-1 flex items-center justify-center overflow-y-scroll h-full"
            style={{
              scrollbarColor: "#D0D8E5 transparent",
              overflowX: "hidden",
              overscrollBehaviorY: "contain",
              flexFlow: "column",
              scrollbarGutter: "stable",
              marginRight: noteLength > 200 ? "0.5rem" : "0",
            }}
          >
            <div className="max-w-3xl 2xl:max-w-4xl max-h-full">
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
              className="h-24 py-5 px-7 rounded-lg rounded-bl-none rounded-br-none"
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
    </div>
  );
};
