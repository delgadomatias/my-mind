import { ColorThiefActions } from "@/app/actions";
import { extractSrcFromImageTag } from "@/app/utils/extractSrcFromImageTag";
import { isImageInContent } from "@/app/utils/isImageInContent";
import { Note } from "@/interfaces/note.interface";
import { NoteImageModal } from "./NoteImageModal";
import { NoteTextModal } from "./NoteTextModal";

interface Props {
  note: Note;
}

export const NoteDetails = async ({ note }: Props) => {
  const isImage = isImageInContent(note.content);

  if (isImage) {
    const imageSrc = extractSrcFromImageTag(note.content)!;
    const dominantColor = await ColorThiefActions.getDominantColor(imageSrc);

    return (
      <NoteImageModal
        dominantColor={dominantColor}
        imageSrc={imageSrc}
        note={note}
      />
    );
  }

  return <NoteTextModal note={note} />;
};
