import { Note } from "@/interfaces/note.interface";
import { motion } from "framer-motion";
import Link from "next/link";
import { MarkdownEditor } from "../editor/MarkdownEditor";

interface Props {
  note: Note;
}

export const NoteItem = ({ note }: Props) => {
  const { id, content } = note;
  return (
    <Link
      className="hover:border-[#B8C3D3] max-w-fit rounded-md flex hover:border-4 border-4 border-transparent transition-all duration-50 ease-linear"
      href={id}
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.7 }}
      >
        <MarkdownEditor
          markdown={content}
          className="p-6 bg-white rounded-md shadow-md max-w-fit non-editable hover:bg-red-500 "
        />
      </motion.div>
    </Link>
  );
};
