import { getAllNotes } from "@/app/actions/notes.action";
import { NoteListMasonry } from "./NoteListMasonry";

export const NoteList = async () => {
  const notes = await getAllNotes();

  return <NoteListMasonry notes={notes} />;
};
