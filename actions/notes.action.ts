"use server";

import {
  getDbOnServerActions,
  getDbOnServerComponent,
} from "@/database/server";
import { Note } from "@/interfaces";
import { NoteDTO } from "@/interfaces/dto/note.dto";
import { getUser } from "@/utils/getUser";
import { revalidatePath } from "next/cache";

export async function getAllNotes(): Promise<Note[]> {
  const supabase = await getDbOnServerComponent();
  const user = await getUser();
  const { id } = user!;

  const { data: notesFromUser } = await supabase
    .from("Note")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });
  return notesFromUser as Note[];
}

export async function createNote(note: NoteDTO): Promise<NoteDTO[]> {
  const supabase = await getDbOnServerActions();
  const user = await getUser();

  if (!user) {
    throw new Error("Please login to create a note.");
  }

  const noteToAdd = { ...note, user_id: user.id };

  const { data } = await supabase
    .from("Note")
    .insert({ ...noteToAdd })
    .select("*");

  revalidatePath("/");

  return data as NoteDTO[];
}

export async function getNoteById(id: string): Promise<Note> {
  const supabase = await getDbOnServerActions();
  const { data } = await supabase.from("Note").select("*").eq("id", id);

  return data![0] as Note;
}

export async function updateNote(note: Note): Promise<NoteDTO[]> {
  const supabase = await getDbOnServerActions();
  const { data } = await supabase
    .from("Note")
    .update({ ...note })
    .eq("id", note.id)
    .select("*");

  revalidatePath("/");

  return data as NoteDTO[];
}

export async function deleteNote(id: string): Promise<NoteDTO[]> {
  const supabase = await getDbOnServerActions();
  const { data } = await supabase
    .from("Note")
    .delete()
    .eq("id", id)
    .select("*");

  revalidatePath("/");
  return data as NoteDTO[];
}

export async function addTagToNote(
  noteId: string,
  tag: string,
): Promise<NoteDTO[]> {
  const supabase = await getDbOnServerActions();
  const previousTags = await getNoteById(noteId);
  const tags = previousTags.tags ? `${previousTags.tags},${tag}` : tag;

  const { data } = await supabase
    .from("Note")
    .update({ tags })
    .eq("id", noteId)
    .select("*");

  return data as NoteDTO[];
}

export async function deleteTagFromNote(noteId: string, tag: string) {
  const supabase = await getDbOnServerActions();
  const previousTags = await getNoteById(noteId);
  const tags = previousTags.tags
    ? previousTags.tags
        .split(",")
        .filter((t) => t !== tag)
        .join(",")
    : "";

  const { data } = await supabase
    .from("Note")
    .update({ tags })
    .eq("id", noteId)
    .select("*");

  return data as NoteDTO[];
}

export async function saveSharedNote(note: Note, userId: string) {
  const newNote = {
    title: note.title,
    tags: note.tags,
    content: note.content,
    original_id: note.id,
  };

  const supabase = await getDbOnServerActions();
  const { data } = await supabase
    .from("Note")
    .insert({ ...newNote, user_id: userId });
}

export async function createShareLink(noteId: string) {
  const supabase = await getDbOnServerActions();

  const { data: sharesFromNote } = await supabase
    .from("Share")
    .select("*")
    .eq("note_id", noteId);

  const disabledShareAndNonExpired = sharesFromNote?.filter((share) => {
    return !share.active && new Date(share.expiration_date) > new Date();
  });

  if (!disabledShareAndNonExpired) {
    const { data, error } = await supabase
      .from("Share")
      .insert({ note_id: noteId })
      .select("id")
      .single();

    await supabase
      .from("Note")
      .update({ is_shared: true, shared_id: data?.id })
      .eq("id", noteId);

    return data as {
      id: string;
    };
  }

  const data = disabledShareAndNonExpired[0];
  await supabase.from("Share").update({ active: true }).eq("id", data.id);
  await supabase
    .from("Note")
    .update({ is_shared: true, shared_id: data.id })
    .eq("id", noteId);

  return data as {
    id: string;
  };
}

export async function disableShareLink(noteId: string) {
  const supabase = await getDbOnServerActions();
  await supabase.from("Note").update({ is_shared: false }).eq("id", noteId);
  const { data, error } = await supabase
    .from("Share")
    .update({ active: false })
    .eq("note_id", noteId);
}
