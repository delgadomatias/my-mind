"use client";

import { NoteActions } from "@/app/actions";
import { Note } from "@/app/interfaces";
import { useState } from "react";
import { BackdropShadow } from "./BackdropShadow";
import { ModalImageDetail } from "./ModalImageDetail";

interface Props {
  dominantColor: string;
  imageSrc: string;
  note: Note;
}

export const NoteImageModal = ({ note, dominantColor, imageSrc }: Props) => {
  const [updatedNote, setUpdatedNote] = useState(note);

  function handleUpdateNote() {
    if (note.title === updatedNote.title) {
      return;
    }

    NoteActions.updateNote({
      ...updatedNote,
    });
  }

  return (
    <div>
      <BackdropShadow onUpdateNote={handleUpdateNote} closeOnEscape />
      <ModalImageDetail
        dominantColor={dominantColor}
        note={note}
        src={imageSrc}
        setUpdatedNote={setUpdatedNote}
      />
    </div>
  );
};
