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
  let focusMode = queryParams.focus || false;
  if (focusMode === "true") {
    focusMode = true;
  } else {
    focusMode = false;
  }

  if (focusMode) {
    return <FocusModeContainer note={note} />;
  }

  return <TextModalDetails note={note} />;
};
