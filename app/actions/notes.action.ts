"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDbOnAction } from "../database/supabase";
import { Note } from "../interfaces";
import { NoteDTO } from "../interfaces/dto/note.dto";

export async function getAllNotes(): Promise<Note[]> {
  const supabase = await getDbOnAction();
  const { data } = await supabase
    .from("Notes")
    .select("*")
    .order("created_at", { ascending: false });
  return data as Note[];
}

export async function createNote(note: NoteDTO): Promise<NoteDTO[]> {
  const supabase = await getDbOnAction();

  const { data } = await supabase
    .from("Notes")
    .insert({ ...note })
    .select("*");

  revalidatePath("/");

  return data as NoteDTO[];
}

export async function getNoteById(id: string): Promise<Note> {
  const supabase = await getDbOnAction();
  const { data } = await supabase.from("Notes").select("*").eq("id", id);

  if (!data || data.length === 0) {
    redirect("/");
  }

  return data[0] as Note;
}

export async function updateNote(note: Note): Promise<NoteDTO[]> {
  const supabase = await getDbOnAction();
  const { data } = await supabase
    .from("Notes")
    .update({ ...note })
    .eq("id", note.id)
    .select("*");

  revalidatePath("/");

  return data as NoteDTO[];
}

export async function deleteNote(id: string): Promise<NoteDTO[]> {
  const supabase = await getDbOnAction();
  const { data } = await supabase
    .from("Notes")
    .delete()
    .eq("id", id)
    .select("*");

  revalidatePath("/");

  return data as NoteDTO[];
}
