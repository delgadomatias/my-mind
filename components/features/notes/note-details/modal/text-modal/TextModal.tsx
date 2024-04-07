"use client";

import { useHash } from "@/hooks/useHash";
import { Note } from "@/interfaces";
import { FocusModeContainer } from "../../focus-mode/FocusModeContainer";
import { TextModalDetails } from "./TextModalDetails";

interface Props {
  note: Note;
}

export const TextModal = ({ note }: Props) => {
  const { queryParams } = useHash();
  const focusMode = queryParams.focus || false;

  if (focusMode) {
    return <FocusModeContainer note={note} />;
  }

  return <TextModalDetails note={note} />;
};
