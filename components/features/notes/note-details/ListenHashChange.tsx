"use client";

import { ImageModal } from "@/features/notes/note-details/modal/image-modal/ImageModal";
import { TextModal } from "@/features/notes/note-details/modal/text-modal/TextModal";
import { useNoteWithHash } from "@/hooks";
import { ShadowLoader } from "@/shared/ui/ShadowLoader";
import { isImageInContent } from "@/utils";

/**
 * Renders a modal component based on the content of the note.
 * If the note contains an image, it renders an ImageModal component.
 * If the note contains text, it renders a TextModal component.
 * If the note is still loading, it renders a ShadowLoader component.
 */
export const ListenHashChange = () => {
  const { note, isLoading } = useNoteWithHash();

  if (isLoading) return <ShadowLoader />;
  if (!note) return;

  const { content } = note;
  const isImage = isImageInContent(content);
  return isImage ? <ImageModal note={note} /> : <TextModal note={note} />;
};
