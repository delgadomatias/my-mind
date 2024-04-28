"use client";

import { DEFAULT_NOTE_CONTENT } from "@/utils";
import { useState } from "react";
import { AddNoteDesktop } from "./add-note/AddNoteDesktop";

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
    <>
      <AddNoteDesktop
        handleOnChange={handleOnChange}
        isSaving={isSaving}
        isTyping={isTyping}
        onAddNote={onAddNote}
        onFocus={onFocus}
      />
    </>
  );
};
