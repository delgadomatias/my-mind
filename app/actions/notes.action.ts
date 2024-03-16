"use server";

import { supabase } from "../database/initSupabase";

export async function getAllNotes() {
  const supabaseClient = await supabase.from("Notes").select("*");
  console.log(supabaseClient.data);
}
