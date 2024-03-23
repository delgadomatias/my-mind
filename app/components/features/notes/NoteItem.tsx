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
    <div className="flex flex-col gap-1">
      <Link
        className="duration-50 note-item group relative z-10 h-fit min-w-fit max-w-full break-inside-avoid border-transparent transition-all ease-linear sm:max-w-[800px]"
        draggable={false}
        href={id}
      >
        <HoverNote />
        {isImage && <NoteImage content={content} />}
        {!isImage && <NoteText note={note} />}
      </Link>

      {note.title && (
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-[#748297]">
          {note.title}
        </p>
      )}
    </div>
  );
};
