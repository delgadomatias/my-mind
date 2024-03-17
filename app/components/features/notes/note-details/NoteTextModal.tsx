"use client";

import { NoteActions } from "@/app/actions";
import { Note } from "@/app/interfaces";
import { DEFAULT_NOTE_CONTENT } from "@/app/utils/constants";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BackdropShadow } from "./BackdropShadow";
import { ModalTextDetail } from "./ModalTextDetail";
import { FocusMode } from "./focus-mode/FocusMode";

interface Props {
  note: Note;
}

export const NoteTextModal = ({ note }: Props) => {
  const [updatedNote, setUpdatedNote] = useState(note);
  const searchParams = useSearchParams();
  const focusMode = searchParams.get("focus");

  // Necesito Handlear todo desde este componente asi me comunico con el
  function handleUpdateNote() {
    const { content } = updatedNote;

    if (note.content === content && note.title === updatedNote.title) {
      console.log("no se actualiza");
      return;
    }

    if (DEFAULT_NOTE_CONTENT === content) {
      return NoteActions.deleteNote(note.id);
    }

    NoteActions.updateNote({
      ...updatedNote,
    });
  }

  if (focusMode) {
    return (
      <>
        <BackdropShadow onUpdateNote={handleUpdateNote} />
        <FocusMode note={note} />
      </>
    );
  }

  return (
    <div>
      <BackdropShadow onUpdateNote={handleUpdateNote} />
      <ModalTextDetail note={note} setUpdatedNote={setUpdatedNote} />
    </div>
  );
};
