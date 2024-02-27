import { NoteContainer } from "./NoteContainer";
import { NoteList } from "./note/NoteList";

export const NoteSection = () => {
  return (
    <div className="container p-6 mx-auto">
      <NoteContainer />
      <NoteList />
    </div>
  );
};
