"use client";

import { DEFAULT_NOTE_CONTENT } from "@/app/utils/constants";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import AddNoteEditor from "../../shared/markdown-editor/AddNoteEditor";

const EditableMarkdownEditor = dynamic(
  () => import("@/components/shared/markdown-editor/EditableMarkdownEditor"),
  {
    ssr: false,
    loading: () => <div className="h-[56px] w-full"></div>,
  }
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
      {/* Change this padding on Mobile */}
      <div className="pr-40 z-10 relative mb-5 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] pl-6 py-2">
        <AddNoteEditor
          content={noteContent}
          isTyping={isTyping}
          onAddNote={onAddNote}
          onChange={handleOnChange}
          onFocus={onFocus}
        />
      </div>

      {/* <hr className="mt-2 mb-5 border-[1px] border-black/10" /> */}

      {/* Div for show the tooltip for save */}
      {/* <motion.div
        className="absolute top-0 right-0 w-40 h-full p-2 text-center transition-all ease-in duration-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTyping ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="h-full w-full bg-[#ff5924] flex items-center justify-center px-4 rounded-md">
          <span className="text-sm" id="command-key"></span>
        </div>
      </motion.div> */}

      {/* Div for show a message */}
      <motion.div
        className="absolute inset-0 w-full text-center transition-all ease-in duration-800"
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
        <div className="h-full w-full bg-[#ff5924] flex items-center justify-center p-1 rounded-md">
          <p className="text-white text-md">I&apos;ll remember this for you</p>
        </div>
      </motion.div>
    </div>
  );
};
