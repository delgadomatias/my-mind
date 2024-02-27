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
    dispatch({ type: "note/update", payload: note });
    const previousNotes = JSON.parse(getItem("notes") || "[]");
    const updatedNotes = previousNotes.map((n: Note) =>
      n.id === note.id ? note : n
    );
    setItem("notes", JSON.stringify(updatedNotes));
  }

  function deleteNote(noteId: string) {
    dispatch({ type: "note/delete", payload: noteId });
    const previousNotes = JSON.parse(getItem("notes") || "[]");
    const updatedNotes = previousNotes.filter((n: Note) => n.id !== noteId);
    setItem("notes", JSON.stringify(updatedNotes));
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
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
