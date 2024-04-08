"use client";

import { NoteActions } from "@/actions";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Note } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { TagSubmit } from "./TagSubmit";

interface Props {
  note: Note;
}

export const CardTags = ({ note }: Props) => {
  const [showInput, setShowInput] = useState(false);
  const [noteTags, setNoteTags] = useState(note.tags?.split(",") || []);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function toggleInput(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowInput((prev) => !prev);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }

  async function handleAddTag(form: FormData) {
    const newTag = form.get("tag");
    if (!newTag) return;

    await NoteActions.addTagToNote(note.id, newTag as string);
    setNoteTags((prev) => [...prev, newTag as string]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleDeleteTag(tag: string) {
    const newTags = noteTags.filter((t) => t !== tag);
    setNoteTags(newTags);
    NoteActions.deleteTagFromNote(note.id, tag);
  }

  function searchTag(tag: string) {
    window.location.href = `/?search=${tag}`;
  }

  return (
    <form className="flex flex-col gap-2" action={handleAddTag}>
      <label htmlFor="tag" className="text-sm uppercase text-[#909CAE]">
        Mind tags
      </label>
      <MotionDiv
        className="mb-2 grid-cols-12"
        initial={{ display: "none", opacity: 0 }}
        animate={{ display: showInput ? "grid" : "none", opacity: 1 }}
        exit={{ display: "none", opacity: 0 }}
      >
        <input
          type="text"
          name="tag"
          className="col-span-10 h-full rounded-lg rounded-br-none rounded-tr-none border-none bg-white px-4 py-3 shadow-lg outline-none"
          ref={inputRef}
        />
        <TagSubmit />
      </MotionDiv>
      <div className="flex flex-wrap items-stretch gap-2">
        <button
          className="h-9 select-none rounded-2xl border-1 border-[#ff5924] bg-[#ff5924] px-4  font-semibold tracking-[-0.45px] text-white hover:bg-white hover:text-[#ff5924]"
          type="button"
          onClick={toggleInput}
        >
          + Add tag
        </button>
        {noteTags?.map((tag) => {
          return (
            <span
              key={tag}
              className="group relative flex h-9 cursor-pointer items-center justify-center gap-[2px]  rounded-2xl bg-[#E3E7EE] px-3 text-[#748297] hover:bg-white hover:shadow-[5px_5px_22px_rgb(0_0_0_/_11%)]"
              onClick={() => searchTag(tag)}
            >
              <span
                className="absolute -right-[2px] -top-1 h-4 w-4 cursor-pointer bg-[url(https://static.accelerator.net/134/0.28.3/icons/remove-orange-alt.svg)] opacity-0 hover:bg-[url(https://static.accelerator.net/134/0.28.3/icons/remove-orange.svg)] group-hover:opacity-100"
                onClick={() => handleDeleteTag(tag)}
                style={{
                  content: "",
                }}
              ></span>
              <span>#</span>
              {tag}
            </span>
          );
        })}
      </div>
    </form>
  );
};
