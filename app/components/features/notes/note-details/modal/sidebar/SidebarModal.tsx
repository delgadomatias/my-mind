import { NoteActions } from "@/app/actions";
import { Note } from "@/app/interfaces";
import { Dispatch, SetStateAction } from "react";
import { CardActions } from "./CardActions";

interface Props {
  setUpdatedNote: Dispatch<SetStateAction<Note>>;
  noteId: string;
  title: string;
}

export const SidebarModal = ({ setUpdatedNote, noteId, title }: Props) => {
  async function onDeleteNote() {
    await NoteActions.deleteNote(noteId);
  }

  function onTitleChange(title: string) {
    setUpdatedNote((prev) => ({
      ...prev,
      title,
    }));
  }

  return (
    <div className="bg-[#F0F2F5] h-full w-[400px] rounded-lg flex flex-col justify-between">
      <header
        className="h-24 py-5 rounded-lg rounded-bl-none rounded-br-none px-7"
        style={{
          background:
            "linear-gradient(180deg, #D1D9E6 0%, #EAEDF1 105%, #EAEDF1 105%)",
        }}
      >
        <input
          type="text"
          placeholder="Title goes here"
          className="text-[#505864] bg-transparent w-full text-ellipsis border-none text-3xl font-light focus:outline-none focus:text-black"
          onChange={(e) => onTitleChange(e.target.value)}
          defaultValue={title || ""}
        />
      </header>

      <CardActions onDeleteNote={onDeleteNote} />
    </div>
  );
};
