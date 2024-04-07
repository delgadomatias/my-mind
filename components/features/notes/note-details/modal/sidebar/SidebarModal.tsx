import { NoteActions } from "@/actions";
import { Note } from "@/interfaces";
import { formatDistanceToNow } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { CardActions } from "./CardActions";
import { CardTags } from "./CardTags";

interface Props {
  setUpdatedNote: Dispatch<SetStateAction<Note>>;
  note: Note;
}

export const SidebarModal = ({ setUpdatedNote, note }: Props) => {
  const { id, content, created_at, title } = note;
  const formatDistance = formatDistanceToNow(new Date(created_at));

  async function onDeleteNote() {
    await NoteActions.deleteNote(id);
  }

  function onTitleChange(title: string) {
    setUpdatedNote((prev) => ({
      ...prev,
      title,
    }));
  }

  return (
    <div className="hidden h-full w-[400px] flex-col justify-between rounded-lg bg-[#F0F2F5] lg:flex">
      <div className="flex flex-col gap-4 overflow-auto">
        <header
          className="h-24 rounded-lg rounded-bl-none rounded-br-none px-7 py-5"
          style={{
            background:
              "linear-gradient(180deg, #D1D9E6 0%, #EAEDF1 105%, #EAEDF1 105%)",
          }}
        >
          <input
            type="text"
            placeholder="Title goes here"
            className="w-full text-ellipsis border-none bg-transparent text-3xl font-light text-[#505864] focus:text-black focus:outline-none"
            onChange={(e) => onTitleChange(e.target.value)}
            defaultValue={title || ""}
          />

          <time dateTime={created_at.toString()}>
            <span className="select-none font-normal  text-[#8E9DB4]">
              {formatDistance[0].toUpperCase() + formatDistance.slice(1)} ago
            </span>
          </time>
        </header>

        <div
          className="overflow-y-scroll px-7"
          style={{
            scrollbarColor: "#D0D8E5 transparent",
            scrollbarWidth: "thin",
            marginRight: "0.5rem",
          }}
        >
          <CardTags note={note} key={note.tags} />
        </div>
      </div>
      <CardActions onDeleteNote={onDeleteNote} />
    </div>
  );
};
