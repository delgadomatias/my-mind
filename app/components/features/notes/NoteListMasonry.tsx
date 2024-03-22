"use client";

import { Note } from "@/app/interfaces";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { MotionDiv } from "../../shared/MotionDiv";
import { NoteItem } from "./NoteItem";

interface Props {
  notes: Note[];
}

export const NoteListMasonry = ({ notes }: Props) => {
  return (
    <MotionDiv
      className="relative"
      id="note-list"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          350: 1,
          640: 2,
          768: 3,
          1024: 4,
          1280: 5,
          1536: 6,
        }}
      >
        <Masonry gutter="10px 20px">
          {notes.map((note) => {
            return <NoteItem note={note} key={note.id} />;
          })}
        </Masonry>
      </ResponsiveMasonry>
    </MotionDiv>
  );
};
