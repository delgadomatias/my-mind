"use client";

import { NoteActions } from "@/actions";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Note } from "@/interfaces";
import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

interface Props {
  note: Note;
}

export const CardTags = ({ note }: Props) => {
  const [showInput, setShowInput] = useState(false);
  const [noteTags, setNoteTags] = useState(note.tags?.split(",") || []);
  const inputRef = useRef<HTMLInputElement>(null);

  function toggleInput(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowInput((prev) => !prev);
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

  return (
    <form className="flex flex-col gap-2" action={handleAddTag}>
      <label htmlFor="tag" className="text-sm uppercase text-[#909CAE]">
        Mind tags
      </label>
      <AnimatePresence>
        {showInput && (
          <MotionDiv
            className="mb-2 grid grid-cols-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <input
              type="text"
              name="tag"
              className="col-span-10 h-full rounded-lg rounded-br-none rounded-tr-none border-none bg-white px-4 py-3 shadow-lg outline-none"
              ref={inputRef}
            />
            <button
              className="col-span-2 rounded-lg rounded-bl-none rounded-tl-none bg-[#FF5924] text-3xl text-white"
              type="submit"
            >
              +
            </button>
          </MotionDiv>
        )}
      </AnimatePresence>
      <div className="flex flex-wrap items-stretch gap-2">
        <button
          className="h-8 select-none rounded-2xl border-1 border-[#ff5924] bg-[#ff5924] px-4 font-semibold tracking-[-0.45px] text-white hover:bg-white hover:text-[#ff5924]"
          type="button"
          onClick={toggleInput}
        >
          Add tag
        </button>
        {noteTags?.map((tag) => {
          return (
            <span
              key={tag}
              className="flex h-8 items-center justify-center gap-[2px] rounded-2xl bg-[#E3E7EE] px-4 text-[#748297]"
            >
              <span>#</span>
              {tag}
            </span>
          );
        })}
      </div>
    </form>
  );
};
