import { isImageInContent } from "@/app/utils/isImageInContent";
import { Note } from "@/interfaces/note.interface";
import Link from "next/link";
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
      className="rounded-md flex border-transparent transition-all duration-50 ease-linear h-fit break-inside-avoid z-10  max-w-full sm:max-w-[800px] relative group"
      href={id}
      key={id + content}
    >
      <div className="border-4 border-[#B8C3D3] absolute inset-0 z-50 rounded-md group-hover:opacity-100 opacity-0  transition-opacity duration-75 ease-in scale-[1.02]"></div>
      {isImage && <NoteImage content={content} />}
      {!isImage && <NoteText content={content} />}
    </Link>
  );
};
