"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useNoteContext } from "../context/notes";
import { ForwardRefEditor } from "./editor/ForwardRefEditor";

export const Note = () => {
  const { notes } = useNoteContext();

  return (
    <div className="my-4">
      {notes.map((note) => {
        return (
          <Link
            key={note.id}
            href={note.id}
            className="hover:border-[#B8C3D3] max-w-fit rounded-md flex hover:border-4 border-4 border-transparent transition-all duration-50 ease-linear"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <ForwardRefEditor
                markdown={note.content}
                className="p-6 bg-white rounded-md shadow-md max-w-fit non-editable hover:bg-red-500 "
              />
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};
