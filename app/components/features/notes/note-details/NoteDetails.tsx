import { isImageInContent } from "@/app/utils/isImageInContent";
import { Note } from "@/interfaces/note.interface";
import { ImageModal } from "./modal/image-modal/ImageModal";
import { TextModal } from "./modal/text-modal/TextModal";

interface Props {
  note: Note;
}

export const NoteDetails = async ({ note }: Props) => {
  const isImage = isImageInContent(note.content);

  if (isImage) return <ImageModal note={note} />;
  return <TextModal note={note} />;
};
