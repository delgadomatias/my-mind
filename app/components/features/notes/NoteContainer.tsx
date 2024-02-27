"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";

const MarkdownEditor = dynamic(() => import("../../shared/MarkdownEditor"), {
  ssr: false,
  loading: () => <div className="h-[56px] w-full"></div>,
});

const DEFAULT_NOTE = "<p></p>";

export const NoteContainer = () => {
  const [noteContent, setNoteContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  function handleOnChange(richText: string) {
    setNoteContent(richText);

    if (richText === DEFAULT_NOTE) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
  }

  function onAddNote() {
    setNoteContent("");

    // Only for animation purposes
    setTimeout(() => {
      setIsSaving(true);
    }, 200);

    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  }

  function onBlur() {
    setIsTyping(false);
  }

  function onFocus() {
    if (noteContent.length > 0 && noteContent !== DEFAULT_NOTE) {
      setIsTyping(true);
    }
  }

  return (
    <div className="relative">
      {/* Change this padding on Mobile */}
      <div className="pr-40">
        <MarkdownEditor
          content={noteContent}
          editable
          onAddNote={onAddNote}
          onBlur={onBlur}
          onChange={handleOnChange}
          onFocus={onFocus}
        />
      </div>

      <hr className="mt-2 mb-5 border-[1px] border-black/10" />

      {/* Div for show the tooltip for save */}
      <motion.div
        className="absolute right-0 top-0 h-full transition-all duration-800 ease-in w-40 text-center p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTyping ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="h-full w-full bg-[#ff5924] flex items-center justify-center px-4 rounded-md">
          <span className="text-sm" id="command-key"></span>
        </div>
      </motion.div>

      {/* Div for show a message */}
      <motion.div
        className="absolute inset-0 transition-all duration-800 ease-in w-full text-center"
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
          <p className="text-md  text-white">I&apos;ll remember this for you</p>
        </div>
      </motion.div>
    </div>
  );
};
