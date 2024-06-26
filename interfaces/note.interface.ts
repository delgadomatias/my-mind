export interface Note {
  id: NoteId;
  content: string;
  created_at: Date;
  title?: string;
  user_id: string;
  tags: string | null;
  original_id: string | null;
  is_shared: boolean;
  shared_id: string | null;
  is_on_top: boolean;
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
