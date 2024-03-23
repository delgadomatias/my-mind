import { NoteContainer } from "../features/notes/NoteContainer";
import { NoteList } from "../features/notes/NoteList";

export const NoteSection = () => {
  return (
    <div className="container mx-auto p-6">
      <NoteContainer />
      <NoteList />
    </div>
  );
};
