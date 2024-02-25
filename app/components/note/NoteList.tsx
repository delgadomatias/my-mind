"use client";

import { getSortedNotes } from "@/app/utils/getSortedNotes";
import { useNoteContext } from "../../context/notes";
import { NoteItem } from "./NoteItem";

export const NoteList = () => {
  const { notes } = useNoteContext();
  const sortedNotes = getSortedNotes(notes);

  return (
    <div className="my-4 flex gap-2 flex-wrap">
      {sortedNotes.map((note) => {
        return <NoteItem note={note} key={note.id} />;
      })}
    </div>
  );
};
