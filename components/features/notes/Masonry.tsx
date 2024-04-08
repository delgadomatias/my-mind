"use client";

import { Note } from "@/interfaces";
import { MotionDiv } from "@/shared/MotionDiv";
import { filterNoteByQuery } from "@/utils";
import { useSearchParams } from "next/navigation";
import ReactMasonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { NoteItem } from "./note-item/NoteItem";

interface Props {
  notes: Note[];
}

export const Masonry = ({ notes }: Props) => {
  const searchQuery = useSearchParams().get("search");

  if (!notes) return;

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
          350: 2,
          640: 2,
          768: 3,
          1024: 4,
          1280: 4,
          1536: 5,
        }}
      >
        <ReactMasonry className="masonry !gap-[10px] lg:!gap-[12px_20px]">
          {notes.map((note) => {
            return <NoteItem note={note} key={note.id} />;
          })}
        </ReactMasonry>
      </ResponsiveMasonry>
    </MotionDiv>
  );
};
