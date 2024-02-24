import { useContext } from "react";
import { NoteContext } from "./NoteContext";

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  return context;
};
