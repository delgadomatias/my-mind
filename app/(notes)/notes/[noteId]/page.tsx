import { NoteActions } from "@/actions";
import { NoteDetails } from "@/components/features/notes/note-details/NoteDetails";

interface Props {
  params: {
    noteId: string;
  };
}

const NoteDetail = async ({ params }: Props) => {
  const note = await NoteActions.getNoteById(params.noteId);
  return <NoteDetails note={note} />;
};

export default NoteDetail;
