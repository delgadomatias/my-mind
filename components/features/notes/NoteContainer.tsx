"use client";

import { DEFAULT_NOTE_CONTENT } from "@/utils";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { SearchNoteContainer } from "../search-note/SearchNoteContainer";
import { AddNoteDesktop } from "./add-note/AddNoteDesktop";
import { AddNoteMobile } from "./add-note/AddNoteMobile";

export const NoteContainer = () => {
  const [noteContent, setNoteContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const searchQuery = useSearchParams().get("search");
  const isSearching = searchQuery !== null && searchQuery.length > 0;

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
      <Suspense>
        <SearchNoteContainer />
      </Suspense>
      <AddNoteDesktop
        handleOnChange={handleOnChange}
        isSaving={isSaving}
        isSearching={isSearching}
        isTyping={isTyping}
        noteContent={noteContent}
        onAddNote={onAddNote}
        onFocus={onFocus}
      />
      <AddNoteMobile />
    </>
  );
};
