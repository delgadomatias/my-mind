import { Note, NoteContextState } from "@/app/interfaces";

type NoteAction =
  | { type: "note/add"; payload: Note }
  | { type: "note/update"; payload: Note };

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
    default:
      return state;
  }
};
