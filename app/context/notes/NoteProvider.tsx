"use client";

import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Note, NoteContextState } from "@/interfaces/note.interface";
import React, { useEffect, useReducer } from "react";
import { NoteContext } from "./NoteContext";
import { NoteReducer } from "./NoteReducer";

const NOTE_INITIAL_STATE: NoteContextState = {
  notes: [],
};

export const NoteProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(NoteReducer, NOTE_INITIAL_STATE);
  const { getItem, setItem } = useLocalStorage();

  function addNote(note: Note) {
    dispatch({ type: "note/add", payload: note });
    const previousNotes = JSON.parse(getItem("notes") || "[]");
    setItem("notes", JSON.stringify([...previousNotes, note]));
  }

  function updateNote(note: Note) {
    throw new Error("Not implemented");
  }

  useEffect(() => {
    const notes = JSON.parse(getItem("notes") || "[]");
    dispatch({ type: "note/load", payload: notes });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NoteContext.Provider
      value={{
        ...state,
        addNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
