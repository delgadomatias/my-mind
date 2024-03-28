import { getAllNotes } from "@/actions/notes.action";
import { Suspense } from "react";
import { NoteListMasonry } from "./NoteListMasonry";

export const NoteList = async () => {
  const notes = await getAllNotes();
  return (
    <Suspense>
      <NoteListMasonry notes={notes} />
    </Suspense>
  );
};
