"use client";

import { Note } from "@/interfaces/note.interface";
import Link from "next/link";
import { NoteImage } from "./NoteImage";
import { NoteText } from "./NoteText";

interface Props {
  note: Note;
}

export const NoteItem = ({ note }: Props) => {
  const { id, content } = note;
  const isImageInContent = Boolean(content.match(/<img[^>]*>/g));

  return (
    <Link
      className="hover:border-[#B8C3D3] max-w-full rounded-md flex hover:border-4 border-4 border-transparent transition-all duration-50 ease-linear h-fit break-inside-avoid  "
      href={id}
    >
      {isImageInContent && <NoteImage content={content} />}
      {!isImageInContent && <NoteText content={content} />}
    </Link>
  );
};
