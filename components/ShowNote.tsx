"use client";

import { TextModal } from "@/components/features/notes/note-details/modal/text-modal/TextModal";
import { useNoteWithHash } from "@/hooks/useNoteWithHash";
import { isImageInContent } from "@/utils/isImageInContent";
import { ImageModal } from "./features/notes/note-details/modal/image-modal/ImageModal";
import { ShadowLoader } from "./shared/ui/ShadowLoader";

export const ShowNote = () => {
  const { note, isLoading } = useNoteWithHash();

  if (isLoading) return <ShadowLoader />;
  if (!note) return;

  const { content } = note;
  const isImage = isImageInContent(content);
  return isImage ? <ImageModal note={note} /> : <TextModal note={note} />;
};
