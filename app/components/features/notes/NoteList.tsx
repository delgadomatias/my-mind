import { getAllNotes } from "@/app/actions/notes.action";
import { MotionDiv } from "../../shared/MotionDiv";
import { NoteItem } from "./NoteItem";

export const NoteList = async () => {
  const notes = await getAllNotes();

  return (
    <MotionDiv
      className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-6 gap-y-2"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {notes.map((note) => {
        return <NoteItem note={note} key={note.id + note.content} />;
      })}
    </MotionDiv>
  );
};
