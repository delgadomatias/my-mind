import { NoteContainer } from "../features/notes/NoteContainer";
import { NoteList } from "../features/notes/NoteList";

export const NoteSection = () => {
  return (
    <div className="container p-6 mx-auto">
      <NoteContainer />
      <NoteList />
    </div>
  );
};
