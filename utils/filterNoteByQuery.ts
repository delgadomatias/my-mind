import { Note } from "../interfaces";

export const filterNoteByQuery = (notes: Note[], query: string) => {
  return notes.filter((note) => {
    const noteTitle = note.title?.toLowerCase();
    const noteContent = note.content.toLowerCase();
    const noteTags = note.tags?.split(",");
    const queryLower = query.toLowerCase();

    return (
      noteTitle?.includes(queryLower) ||
      noteContent.includes(queryLower) ||
      noteTags?.some((tag) => tag.toLowerCase().includes(queryLower))
    );
  });
};
