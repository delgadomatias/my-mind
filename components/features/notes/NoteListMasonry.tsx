"use client";

import { Note } from "@/interfaces";
import { filterNoteByQuery } from "@/utils/filterNoteByQuery";
import { useSearchParams } from "next/navigation";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { MotionDiv } from "../../shared/MotionDiv";
import { NoteItem } from "./NoteItem";

interface Props {
  notes: Note[];
}

export const NoteListMasonry = ({ notes }: Props) => {
  const searchQuery = useSearchParams().get("search");

  if (searchQuery) {
    notes = filterNoteByQuery(notes, searchQuery);
  }

  return (
    <MotionDiv
      animate={{ opacity: 1, y: 0 }}
      className="relative"
      id="note-list"
      initial={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          350: 1,
          640: 2,
          768: 3,
          1024: 4,
          1280: 4,
          1536: 5,
        }}
      >
        <Masonry gutter="15px 20px">
          {notes.map((note) => {
            return <NoteItem note={note} key={note.id} />;
          })}
        </Masonry>
      </ResponsiveMasonry>
    </MotionDiv>
  );
};
