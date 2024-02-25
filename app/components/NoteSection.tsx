import { AddNote } from "./note/AddNote";
import { NoteList } from "./note/NoteList";

export const NoteSection = () => {
  return (
    <div className="container p-6 mx-auto">
      <AddNote />
      <NoteList />
    </div>
  );
};
