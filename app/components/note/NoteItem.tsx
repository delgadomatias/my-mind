import { Note } from "@/interfaces/note.interface";
import Link from "next/link";
import { MarkdownEditor } from "../editor/MarkdownEditor";

interface Props {
  note: Note;
}

export const NoteItem = ({ note }: Props) => {
  const { id, content } = note;
  return (
    <Link
      className="hover:border-[#B8C3D3] max-w-full rounded-md flex hover:border-4 border-4 border-transparent transition-all duration-50 ease-linear h-fit"
      href={id}
    >
      <MarkdownEditor
        markdown={content}
        className="p-6 bg-white rounded-md w-full max-w-full non-editable hover:bg-red-500 shadow-[10px_10px_30px_rgb(0_0_0_/_8%)]"
      />
    </Link>
  );
};
