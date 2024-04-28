"use client";

import { PreviewNoteItem } from "@/components/features/notes/note-item/PreviewNoteItem";
import { Note } from "@/interfaces";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { MotionDiv } from "../MotionDiv";

interface Props {
  notes: Note[];
}

export const TopOfMindContainer: React.FC<Props> = ({ notes }) => {
  return (
    <AnimatePresence>
      {notes.length > 0 && (
        <MotionDiv
          animate={{
            opacity: notes.length === 0 ? 0 : 1,
            y: notes.length === 0 ? 0 : 5,
            display: notes.length === 0 ? "none" : "flex",
          }}
          initial={{ opacity: 0, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="relative mb-8 flex h-[170px] w-full flex-wrap items-center  gap-2 overflow-x-auto rounded-lg bg-[#dee2ea] shadow-[0_2px_0_#f5f8fd]"
          style={{
            padding: "28px 38px 28px 28px",
          }}
        >
          <label
            className="absolute -right-[37px] rotate-90 rounded-sm bg-[#f0f2f5] text-[10px] uppercase tracking-[0.1em] text-[#748297]"
            style={{
              padding: "6px 13px",
            }}
          >
            top of mind
          </label>
          {notes.map((note) => {
            return <PreviewNoteItem note={note} key={note.id} />;
          })}
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};
