import { Note } from "../interfaces";

export const getSortedNotes = (notes: Note[]) => {
  return notes.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};
