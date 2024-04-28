"use client";

import { Note } from "@/interfaces/note.interface";
import { isImageInContent } from "@/utils/isImageInContent";
import { HoverNote } from "./HoverNote";
import { NoteImage } from "./NoteImage";
import { NoteText } from "./NoteText";

import {
  deleteNote,
  removeNoteFromTopOfMind,
  setNoteOnTopOfMind,
} from "@/actions/notes.action";
import { Alerts } from "@/components/shared/adapters/alerts";
import { TrashIcon } from "@/components/shared/icons/TrashIcon";
import { Item, Menu, useContextMenu } from "react-contexify";

interface Props {
  note: Note;
}

export const NoteItem = ({ note }: Props) => {
  const { id, content } = note;
  const isImage = isImageInContent(content);
  const menuId = `note-item-${id}`;
  const { show } = useContextMenu({
    id: menuId,
  });

  async function toggleTopOfMind(e: any) {
    if (note.is_on_top) {
      await removeNoteFromTopOfMind(id);
      return;
    }

    await setNoteOnTopOfMind(id);
  }

  async function deleteCard(e: any) {
    Alerts.askOrCancel({
      options: {
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#301934",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      },
      callback: async () => {
        await deleteNote(id);
      },
    });
  }

  function displayMenu(e: any) {
    show({
      event: e,
    });
  }

  return (
    <div className="flex flex-col gap-1 lg:gap-2" id="noteDiv">
      <div
        className={`duration-50 note-item group relative z-10 max-w-full cursor-pointer border-transparent transition-all ease-linear sm:max-w-[800px]`}
        draggable={false}
        onClick={() => {
          window.location.hash = id;
        }}
        onContextMenu={displayMenu}
      >
        <HoverNote />
        {isImage && <NoteImage content={content} />}
        {!isImage && <NoteText note={note} withFocusMode />}
      </div>

      {note.title && (
        <p className="overflow-hidden text-ellipsis whitespace-nowrap pl-[2px] text-sm text-[#748297]">
          {note.title}
        </p>
      )}

      <Menu id={menuId}>
        <Item onClick={toggleTopOfMind}>
          <div className="inline-flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M248,124a56.11,56.11,0,0,0-32-50.61V72a48,48,0,0,0-88-26.49A48,48,0,0,0,40,72v1.39a56,56,0,0,0,0,101.2V176a48,48,0,0,0,88,26.49A48,48,0,0,0,216,176v-1.41A56.09,56.09,0,0,0,248,124ZM88,208a32,32,0,0,1-31.81-28.56A55.87,55.87,0,0,0,64,180h8a8,8,0,0,0,0-16H64A40,40,0,0,1,50.67,86.27,8,8,0,0,0,56,78.73V72a32,32,0,0,1,64,0v68.26A47.8,47.8,0,0,0,88,128a8,8,0,0,0,0,16,32,32,0,0,1,0,64Zm104-44h-8a8,8,0,0,0,0,16h8a55.87,55.87,0,0,0,7.81-.56A32,32,0,1,1,168,144a8,8,0,0,0,0-16,47.8,47.8,0,0,0-32,12.26V72a32,32,0,0,1,64,0v6.73a8,8,0,0,0,5.33,7.54A40,40,0,0,1,192,164Zm16-52a8,8,0,0,1-8,8h-4a36,36,0,0,1-36-36V80a8,8,0,0,1,16,0v4a20,20,0,0,0,20,20h4A8,8,0,0,1,208,112ZM60,120H56a8,8,0,0,1,0-16h4A20,20,0,0,0,80,84V80a8,8,0,0,1,16,0v4A36,36,0,0,1,60,120Z"></path>
            </svg>
            <p>{note.is_on_top ? "Remove from Top of Mind" : "Top of Mind"}</p>
          </div>
        </Item>
        <Item onClick={deleteCard}>
          <div className="inline-flex items-center gap-2 text-red-500">
            <TrashIcon className="fill-red-500" width="22" height="22" />
            <p>Delete card</p>
          </div>
        </Item>
      </Menu>
    </div>
  );
};
