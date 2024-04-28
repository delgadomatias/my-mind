"use client";

import { Note } from "@/interfaces";
import { isImageInContent } from "@/utils";
import { NoteImage } from "./NoteImage";
import { NoteText } from "./NoteText";

interface Props {
  note: Note;
}

export const PreviewNoteItem = ({ note }: Props) => {
  const { id, content } = note;
  const isImage = isImageInContent(content);

  return (
    <div className="flex h-full flex-col gap-1 lg:gap-2">
      <div
        className={`duration-50 note-item group relative z-10 h-full w-full max-w-full cursor-pointer border-transparent transition-all ease-linear hover:shadow-[20px_20px_40px_#BABFC2] sm:!max-w-[300px]`}
        id="previewNoteItem"
        draggable={false}
        onClick={() => {
          window.location.hash = id;
        }}
      >
        {isImage && <NoteImage content={content} />}
        {!isImage && <NoteText note={note} />}
      </div>

      {note.title && (
        <p className="overflow-hidden text-ellipsis whitespace-nowrap pl-[2px] text-sm text-[#748297]">
          {note.title}
        </p>
      )}
    </div>
  );
};
