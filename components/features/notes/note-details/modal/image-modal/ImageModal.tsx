"use client";

import { ColorThiefActions } from "@/actions";
import { ShadowLoader } from "@/components/shared/ui/ShadowLoader";
import { Note } from "@/interfaces";
import { extractSrcFromImageTag } from "@/utils/extractSrcFromImageTag";
import { useEffect, useState } from "react";
import { ImageModalDetails } from "./ImageModalDetails";

interface Props {
  note: Note;
}

export const ImageModal = ({ note }: Props) => {
  const [dominantColor, setDominantColor] = useState<string | null>(null);
  const imageSrc = extractSrcFromImageTag(note.content)!;

  useEffect(() => {
    async function getDominantColor() {
      const color = await ColorThiefActions.getDominantColor(imageSrc);
      setDominantColor(color);
    }

    getDominantColor();
  }, [imageSrc]);

  if (!dominantColor) {
    return <ShadowLoader />;
  }

  const propsToDetails = {
    note,
    dominantColor,
    src: imageSrc,
  };

  return <ImageModalDetails {...propsToDetails} />;
};
