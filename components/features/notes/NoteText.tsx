"use client";

import MarkdownEditor from "@/components/shared/markdown-editor/MarkdownEditor";
import { Note } from "@/interfaces";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  note: Note;
}

export const NoteText = ({ note }: Props) => {
  const [isOnFocus, setIsOnFocus] = useState(false);
  const { content, id, title } = note;
  const { length } = content;
  const router = useRouter();

  function handleFocusMode(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.preventDefault();
    return router.push(`/notes/${id}?focus=true`);
  }

  return (
    <div
      className={`w-full ${length > 500 ? "note-long" : ""} rounded-lg bg-white px-3 py-2 shadow-xl lg:px-6 lg:py-4`}
      style={
        length > 500
          ? {
              maxHeight: "300px",
              overflow: "hidden",
            }
          : {}
      }
    >
      <MarkdownEditor
        content={content}
        className="w-full py-2"
        key={id + content + title}
      />
      <span
        className="group absolute right-2 top-2 z-50 flex flex-col items-center gap-2"
        onClick={handleFocusMode}
      >
        <Image
          src="https://static.accelerator.net/134/0.27.1/icons/focus-circle-light.png"
          alt="Toggle Focus Mode"
          height={18}
          width={18}
          className="!opacity-0 blur-[2px] transition-all duration-150 ease-linear hover:animate-spin hover:blur-0 group-hover:!opacity-100"
          onMouseEnter={() => setIsOnFocus(true)}
          onMouseLeave={() => setIsOnFocus(false)}
        />

        <span
          className="focus-tooltip !pointer-events-none absolute -top-8 rounded-md bg-[#F0F2F5] px-4 py-1 text-sm font-medium text-black opacity-0 shadow-xl transition-all duration-150 ease-linear"
          style={{
            opacity: isOnFocus ? 1 : 0,
          }}
        >
          Focus
        </span>
      </span>
    </div>
  );
};
