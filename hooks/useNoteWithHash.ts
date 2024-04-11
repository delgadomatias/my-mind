import { getDbOnClient } from "@/database/client";
import { Note } from "@/interfaces";
import { useEffect, useState } from "react";
import { useHash } from "./useHash";

/**
 * Custom hook that fetches a note based on the provided hash.
 * @returns An object containing the fetched note and a loading indicator.
 */
export const useNoteWithHash = () => {
  const [note, setNote] = useState<Note | null>(null);
  const { hash } = useHash();

  useEffect(() => {
    if (!hash) return setNote(null);

    async function fetchNote() {
      const supabaseClient = getDbOnClient();
      const { data: userLogged } = await supabaseClient.auth.getUser();
      const { data: userNotes } = await supabaseClient
        .from("Note")
        .select("*")
        .eq("user_id", userLogged.user?.id);

      if (!userNotes?.some((note: Note) => note.id === hash)) {
        return (window.location.hash = "");
      }

      const { data: foundedNote } = await supabaseClient
        .from("Note")
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
