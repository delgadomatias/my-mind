"use client";

import { Note } from "@/app/interfaces";
import { useSearchParams } from "next/navigation";
import { FocusMode } from "../../focus-mode/FocusMode";
import { LoadingFocusMode } from "../../focus-mode/LoadingFocusMode";
import { TextModalDetails } from "./TextModalDetails";

interface Props {
  note: Note;
}

export const TextModal = ({ note }: Props) => {
  const focusMode = useSearchParams().get("focus");

  if (focusMode) {
    return (
      <>
        <LoadingFocusMode />
        <FocusMode note={note} />
      </>
    );
  }
  return <TextModalDetails note={note} />;
};
