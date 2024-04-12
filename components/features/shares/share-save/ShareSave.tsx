import { getDbOnServerComponent } from "@/database/server";
import { Note } from "@/interfaces";
import { getUser } from "@/utils/getUser";
import { ShareSaveButton } from "./ShareSaveButton";

interface Props {
  note: Note;
}

export const ShareSave = async ({ note }: Props) => {
  const user = await getUser();
  const supabase = await getDbOnServerComponent();
  const { data: userNotes } = await supabase
    .from("Note")
    .select("id, original_id")
    .eq("user_id", user?.id);

  const isNoteAlreadySaved = userNotes?.some(
    (_note) => _note.id === note.id || _note.original_id === note.id,
  );

  if (isNoteAlreadySaved) {
    return (
      <a className="pointer-events-none mt-2 select-none rounded-full bg-[#DDE4EE] px-6 py-3 text-sm uppercase  tracking-[0.1em] text-[#B9C4D4]">
        Already saved
      </a>
    );
  }

  return <ShareSaveButton user={user} note={note} />;
};
