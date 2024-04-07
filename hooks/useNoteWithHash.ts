import { getDbOnClient } from "@/database/client";
import { Note } from "@/interfaces";
import { useEffect, useState } from "react";
import { useHash } from "./useHash";

export const useNoteWithHash = () => {
  const [note, setNote] = useState<Note | null>(null);
  const { hash } = useHash();

  useEffect(() => {
    if (!hash) return setNote(null);

    async function fetchNote() {
      const supabaseClient = getDbOnClient();
      const { data: foundedNote } = await supabaseClient
        .from("Notes")
        .select("*")
        .eq("id", hash)
        .single();

      setNote(foundedNote);
    }

    fetchNote();
  }, [hash]);

  return {
    note,
    isLoading: Boolean(!note && hash),
  };
};
