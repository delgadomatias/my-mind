"use server";

import { getDbOnServerActions } from "@/database/server";
import { Note } from "@/interfaces";
import { NoteDTO } from "@/interfaces/dto/note.dto";
import { getUser } from "@/utils/getUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllNotes(): Promise<Note[]> {
  const supabase = await getDbOnServerActions();
  const user = await getUser();
  const { id } = user!;

  const { data: notesFromUser } = await supabase
    .from("Notes")
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
    .from("Notes")
    .insert({ ...noteToAdd })
    .select("*");

  revalidatePath("/");

  return data as NoteDTO[];
}

export async function getNoteById(id: string): Promise<Note> {
  const supabase = await getDbOnServerActions();
  const { data } = await supabase.from("Notes").select("*").eq("id", id);

  if (!data || data.length === 0) {
    redirect("/");
  }

  return data[0] as Note;
}

export async function updateNote(note: Note): Promise<NoteDTO[]> {
  const supabase = await getDbOnServerActions();
  const { data } = await supabase
    .from("Notes")
    .update({ ...note })
    .eq("id", note.id)
    .select("*");

  revalidatePath("/");

  return data as NoteDTO[];
}

export async function deleteNote(id: string): Promise<NoteDTO[]> {
  const supabase = await getDbOnServerActions();
  const { data } = await supabase
    .from("Notes")
    .delete()
    .eq("id", id)
    .select("*");

  revalidatePath("/");

  return data as NoteDTO[];
}
