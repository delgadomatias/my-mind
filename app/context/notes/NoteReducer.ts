import { Note, NoteContextState } from "@/interfaces/note.interface";

type NoteAction =
  | { type: "note/add"; payload: Note }
  | { type: "note/update"; payload: Note }
  | { type: "note/load"; payload: Note[] };

interface INoteReducer {
  (state: NoteContextState, action: NoteAction): NoteContextState;
}

export const NoteReducer: INoteReducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case "note/add":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case "note/load":
      return {
        ...state,
        notes: action.payload,
      };
    default:
      return state;
  }
};
