"use client";

import { isImageInContent } from "@/app/utils/isImageInContent";
import { useNoteContext } from "@/context/notes";
import { Note, NoteId } from "@/interfaces/note.interface";
import { DEFAULT_NOTE_CONTENT } from "@/utils/constants";
import { useEffect, useMemo, useState } from "react";
import { BackdropShadow } from "./BackdropShadow";
import { NoteModal } from "./NoteModal";

interface Props {
  noteId: NoteId;
}

export const NoteDetails = ({ noteId }: Props) => {
  const { notes, updateNote, deleteNote } = useNoteContext();
  const note = useMemo(
    () => notes.find((n) => n.id === noteId),
    [notes, noteId]
  );
  const isImage = useMemo(() => {
    if (!note) return false;
    return isImageInContent(note.content);
  }, [note]);

  const [updatedNote, setUpdatedNote] = useState({} as Note);

  useEffect(() => {
    if (!note) return;
    setUpdatedNote(note);
  }, [note]);

  // We use this effect to disable scrolling when the modal is open.
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    window.scrollTo(0, 0);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  function onUpdateNote() {
    // If the note is the default note, then we delete it. This is to avoid updating empty notes.
    if (updatedNote.content == DEFAULT_NOTE_CONTENT) {
      return deleteNote(updatedNote.id);
    }

    // There are cases: the updated note is the same as the original note, then we don't need to update. Another case is when the note is undefined, then we don't need to update.
    if (note?.content === updatedNote.content || !note) return;
    updateNote(updatedNote);
  }

  function onNoteChange(richText: string) {
    setUpdatedNote({
      ...updatedNote,
      content: richText,
    });
  }

  if (!note) return;

  return (
    <div>
      <BackdropShadow onUpdateNote={onUpdateNote} />
      <NoteModal onNoteChange={onNoteChange} note={note} isImage={isImage} />
    </div>
  );
};
