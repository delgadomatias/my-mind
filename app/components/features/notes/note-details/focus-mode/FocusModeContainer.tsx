import { Note } from "@/app/interfaces";
import { FocusMode } from "./FocusMode";
import { LoadingFocusMode } from "./LoadingFocusMode";

interface Props {
  note: Note;
}

export const FocusModeContainer = ({ note }: Props) => {
  return (
    <>
      <LoadingFocusMode />
      <FocusMode note={note} />
    </>
  );
};
