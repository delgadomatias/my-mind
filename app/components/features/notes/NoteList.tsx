"use client";

import { getSortedNotes } from "@/app/utils/getSortedNotes";
import { useNoteContext } from "@/context/notes";
import { motion } from "framer-motion";
import { NoteItem } from "./NoteItem";

export const NoteList = () => {
  const { notes } = useNoteContext();
  const sortedNotes = getSortedNotes(notes);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5 gap-y-4"
      initial={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {sortedNotes.map((note) => {
        return <NoteItem note={note} key={`${note.id}+${note.content}`} />;
      })}
    </motion.div>
  );
};
