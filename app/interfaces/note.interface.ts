export interface Note {
  id: NoteId;
  content: string;
  created_at: Date;
  title?: string;
}

export type NoteId = string;

export interface NoteContext {
  notes: Note[];
  addNote: (note: Note) => void;
  addMultipleNotes: (notes: Note[]) => void;
  updateNote: (note: Note) => void;
  deleteNote: (noteId: NoteId) => void;
}

export interface NoteContextState {
  notes: Note[];
}
