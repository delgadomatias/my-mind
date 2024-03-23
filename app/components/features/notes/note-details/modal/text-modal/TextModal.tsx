"use client";

import { Note } from "@/app/interfaces";
import { useSearchParams } from "next/navigation";
import { FocusModeContainer } from "../../focus-mode/FocusModeContainer";
import { TextModalDetails } from "./TextModalDetails";

interface Props {
  note: Note;
}

export const TextModal = ({ note }: Props) => {
  const focusMode = useSearchParams().get("focus");

  if (focusMode) {
    return <FocusModeContainer note={note} />;
  }
  return <TextModalDetails note={note} />;
};
