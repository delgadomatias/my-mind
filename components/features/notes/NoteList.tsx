import { getAllNotes } from "@/actions/notes.action";
import { Suspense } from "react";
import { Masonry } from "./Masonry";

export const NoteList = async () => {
  const notes = await getAllNotes();

  return (
    <Suspense>
      <Masonry notes={notes} />
    </Suspense>
  );
};
