import { isImageInContent } from "@/app/utils/isImageInContent";
import { Note } from "@/interfaces/note.interface";
import Link from "next/link";
import { HoverNote } from "./HoverNote";
import { NoteImage } from "./NoteImage";
import { NoteText } from "./NoteText";

interface Props {
  note: Note;
}

export const NoteItem = ({ note }: Props) => {
  const { id, content } = note;
  const isImage = isImageInContent(content);

  return (
    <Link
      className={`group border-4 border-transparent transition-all duration-50 ease-linear h-fit break-inside-avoid z-10  max-w-full sm:max-w-[800px] relative note-item`}
      href={id}
      key={id + content}
    >
      <HoverNote />
      {isImage && <NoteImage content={content} />}
      {!isImage && <NoteText content={content} />}
    </Link>
  );
};
