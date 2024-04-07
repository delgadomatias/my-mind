import { Note } from "@/interfaces/note.interface";
import { isImageInContent } from "@/utils/isImageInContent";
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
    <div className="flex flex-col gap-1 lg:gap-2">
      <div
        className={`duration-50 note-item group relative z-10 max-w-full cursor-pointer border-transparent transition-all ease-linear sm:max-w-[800px]`}
        draggable={false}
        onClick={() => {
          window.location.hash = id;
        }}
      >
        <HoverNote />
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
