import { Note } from "../interfaces";

export const filterNoteByQuery = (notes: Note[], query: string) => {
  return notes.filter((note) => {
    return (
      note.title?.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
    );
  });
};
