import { Note } from "./note.interface";

export interface ShareResponse {
  id: string;
  created_at: string;
  expiration_date: string;
  note_id: string;
  Note: Note;
  active: boolean;
}
