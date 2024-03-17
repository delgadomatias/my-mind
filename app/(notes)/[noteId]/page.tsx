import { NoteActions } from "@/app/actions";
import { NoteDetails } from "@/app/components/features/notes/note-details/NoteDetails";

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
