"use client";

import { getSortedNotes } from "@/app/utils/getSortedNotes";
import Masonry from "@mui/lab/Masonry";
import { motion } from "framer-motion";
import { useNoteContext } from "../../context/notes";
import { NoteItem } from "./NoteItem";

export const NoteList = () => {
  const { notes } = useNoteContext();
  const sortedNotes = getSortedNotes(notes);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="overflow-hidden"
    >
      <Masonry
        columns={4}
        spacing={1}
        sequential
        defaultColumns={4}
        defaultSpacing={1}
        defaultHeight={250}
        className="transition-all duration-75"
      >
        {sortedNotes.map((note) => {
          return <NoteItem note={note} key={note.id} />;
        })}
      </Masonry>
    </motion.div>
  );
};
