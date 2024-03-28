import { Note } from "@/interfaces/note.interface";
import { isImageInContent } from "@/utils/isImageInContent";
import { Suspense } from "react";
import { ImageModal } from "./modal/image-modal/ImageModal";
import { TextModal } from "./modal/text-modal/TextModal";

interface Props {
  note: Note;
}

export const NoteDetails = async ({ note }: Props) => {
  const isImage = isImageInContent(note.content);

  if (isImage) return <ImageModal note={note} />;
  return (
    <Suspense>
      <TextModal note={note} />;
    </Suspense>
  );
};
