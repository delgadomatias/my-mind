"use client";

import { Note, NoteContextState } from "@/app/interfaces";
import React, { useReducer } from "react";
import { NoteContext } from "./NoteContext";
import { NoteReducer } from "./NoteReducer";

const NOTE_INITIAL_STATE: NoteContextState = {
  notes: [],
};

export const NoteProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(NoteReducer, NOTE_INITIAL_STATE);

  function addNote(note: Note) {
    dispatch({ type: "note/add", payload: note });
  }

  function updateNote(note: Note) {
    throw new Error("Not implemented");
  }

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
