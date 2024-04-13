"use client";

import { Note } from "@/interfaces";
import { MotionDiv } from "@/shared/MotionDiv";
import { filterNoteByQuery } from "@/utils";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ReactMasonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { NoteContainer } from "./NoteContainer";
import { NoteItem } from "./note-item/NoteItem";

interface Props {
  notes: Note[];
}

export const Masonry = ({ notes }: Props) => {
  const searchQuery = useSearchParams().get("search");
  const isSearching = searchQuery !== null && searchQuery.length > 0;

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
      transition={{ duration: 0.2, delay: 0.2 }}
    >
      <AnimatePresence>
        {isSearching && (
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              350: 2,
              640: 2,
              768: 3,
              1024: 3,
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
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isSearching && (
          <MotionDiv
            animate={{ opacity: 1, y: 0 }}
            className="relative"
            id="note-list"
            initial={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <ResponsiveMasonry
              columnsCountBreakPoints={{
                350: 2,
                640: 2,
                768: 3,
                1024: 3,
                1280: 4,
                1536: 5,
              }}
            >
              <ReactMasonry className="masonry !gap-[10px] lg:!gap-[12px_20px]">
                <NoteContainer />
                {notes.map((note) => {
                  return <NoteItem note={note} key={note.id} />;
                })}
              </ReactMasonry>
            </ResponsiveMasonry>
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
};
