import { AddNote } from "./AddNote";
import { Note } from "./Note";

export const NoteSection = () => {
  return (
    <div className="container p-6 mx-auto">
      <AddNote />
      <Note />
      {/* <NoteDetail /> */}
    </div>
  );
};
