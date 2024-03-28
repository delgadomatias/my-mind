import { NoteContainer } from "../features/notes/NoteContainer";
import { NoteList } from "../features/notes/NoteList";

export const NoteSection = () => {
  return (
    <div className="container mx-auto px-20 2xl:px-8">
      <NoteContainer />
      <NoteList />
    </div>
  );
};
