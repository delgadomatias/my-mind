export interface Note {
  id: string;
  content: string;
}

export interface NoteContext {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
}

export interface NoteContextState {
  notes: Note[];
}
