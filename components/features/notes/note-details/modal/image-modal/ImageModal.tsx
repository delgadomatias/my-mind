import { ColorThiefActions } from "@/actions";
import { Note } from "@/interfaces";
import { extractSrcFromImageTag } from "@/utils/extractSrcFromImageTag";
import { ImageModalDetails } from "./ImageModalDetails";

interface Props {
  note: Note;
}

export const ImageModal = async ({ note }: Props) => {
  // Extract the dominant color for the background
  const imageSrc = extractSrcFromImageTag(note.content)!;
  const dominantColor = await ColorThiefActions.getDominantColor(imageSrc);

  const propsToDetails = {
    note,
    dominantColor,
    src: imageSrc,
  };

  return <ImageModalDetails {...propsToDetails} />;
};
