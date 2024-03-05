import { Note, NoteContextState } from "@/interfaces/note.interface";

type NoteAction =
  | { type: "note/add"; payload: Note }
  | { type: "note/update"; payload: Note }
  | { type: "note/load"; payload: Note[] }
  | { type: "note/delete"; payload: string }
  | { type: "note/addMultiple"; payload: Note[] };

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
    case "note/update":
      const idToUpdate = action.payload.id;
      const updatedNotes = state.notes.map((note) => {
        if (note.id === idToUpdate) {
          return action.payload;
        }
        return note;
      });
      return {
        ...state,
        notes: updatedNotes,
      };
    case "note/delete":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case "note/addMultiple":
      return {
        ...state,
        notes: [...state.notes, ...action.payload],
      };
    default:
      return state;
  }
};
