"use client";

import { CookiesActions, NoteActions } from "@/actions";
import { Note } from "@/interfaces";
import { User } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  user: User | null | undefined;
  note: Note;
}

export const ShareSaveButton = ({ user, note }: Props) => {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  async function setCookieViaAction() {
    await CookiesActions.setCookie("next", location.pathname);
  }

  async function handleClick() {
    if (!user) {
      setCookieViaAction();
      router.push("auth/signin");
      return;
    }

    await NoteActions.saveSharedNote(note, user.id);
    setIsSaved(true);
  }

  return (
    <button
      type="button"
      onClick={isSaved ? undefined : handleClick}
      className={`mt-2 rounded-full px-6 py-3 text-sm uppercase tracking-[0.1em] text-white ${isSaved ? "bg-save-gradient" : "bg-[#ff5924]"} transition-all duration-100 ease-linear ${isSaved ? "pointer-events-none" : ""}`}
    >
      {isSaved ? "Note saved" : "Save to my mind"}
    </button>
  );
};
