"use client";

import { getSortedNotes } from "@/app/utils/getSortedNotes";
import { motion } from "framer-motion";
import { useNoteContext } from "../../context/notes";
import { NoteItem } from "./NoteItem";

export const NoteList = () => {
  const { notes } = useNoteContext();
  const sortedNotes = getSortedNotes(notes);

  return (
    <motion.div
      className="columns-1 md:columns-2 lg:columns-3 gap-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {sortedNotes.map((note) => {
        return <NoteItem note={note} key={note.id} />;
      })}
    </motion.div>
  );
};
