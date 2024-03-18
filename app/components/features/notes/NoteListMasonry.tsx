"use client";

import { Note } from "@/app/interfaces";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { MotionDiv } from "../../shared/MotionDiv";
import { NoteItem } from "./NoteItem";

interface Props {
  notes: Note[];
}

export const NoteListMasonry = ({ notes }: Props) => {
  // useEffect(() => {
  //   const masonry = new MiniMasonry({
  //     container: document.querySelector("#note-list") as HTMLDivElement,
  //     baseWidth: 350,
  //   });
  // }, []);

  return (
    <MotionDiv
      className="relative"
      id="note-list"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 5 }}>
        <Masonry gutter="0px 20px">
          {notes.map((note) => {
            return <NoteItem note={note} key={note.id + note.content} />;
          })}
        </Masonry>
      </ResponsiveMasonry>
    </MotionDiv>
  );
};
