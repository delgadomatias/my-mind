"use client";

import { DEFAULT_NOTE_CONTENT } from "@/app/utils/constants";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { SearchNote } from "../search-note/SearchNote";

const AddNoteEditor = dynamic(
  () => import("@/components/shared/markdown-editor/AddNoteEditor"),
  {
    ssr: false,
    loading: () => <div className="h-[54px] w-full"></div>,
  },
);

export const NoteContainer = () => {
  const [noteContent, setNoteContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  function handleOnChange(richText: string) {
    setNoteContent(richText);

    if (richText === DEFAULT_NOTE_CONTENT) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
  }

  function onAddNote() {
    setNoteContent("");
    setIsTyping(false);

    // Only for animation purposes
    setTimeout(() => {
      setIsSaving(true);
    }, 200);

    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  }

  function onFocus() {
    if (noteContent.length > 0 && noteContent !== DEFAULT_NOTE_CONTENT) {
      setIsTyping(true);
    }
  }

  return (
    <div className="relative">
      <Suspense>
        <SearchNote />
      </Suspense>
      {/* Change this padding on Mobile */}
      <div className="relative z-10 mb-5 py-2 pl-6 pr-40 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        <AddNoteEditor
          content={noteContent}
          isTyping={isTyping}
          onAddNote={onAddNote}
          onChange={handleOnChange}
          onFocus={onFocus}
        />
      </div>

      {/* Div for show a message */}
      <motion.div
        className="duration-800 absolute inset-0 w-full text-center transition-all ease-in"
        style={{
          zIndex: isSaving ? 100 : -1,
        }}
        initial={{ opacity: 0, width: "0%" }}
        animate={{
          opacity: isSaving ? 1 : 0,
          width: isSaving ? "100%" : "90%",
        }}
        exit={{ opacity: 0, width: "90%" }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-md bg-[#ff5924] p-1">
          <p className="text-md text-white">I&apos;ll remember this for you</p>
        </div>
      </motion.div>
    </div>
  );
};
