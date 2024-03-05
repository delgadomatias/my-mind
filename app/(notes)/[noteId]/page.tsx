import { NoteDetails } from "@/app/components/features/notes/note-details/NoteDetails";

interface Props {
  params: {
    noteId: string;
  };
}

const NoteDetail = ({ params }: Props) => {
  return <NoteDetails noteId={params.noteId} />;
};

export default NoteDetail;
