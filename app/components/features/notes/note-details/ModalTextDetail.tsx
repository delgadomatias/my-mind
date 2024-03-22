"use client";

import { NoteActions } from "@/app/actions";
import { TrashIcon } from "@/app/components/shared/icons/TrashIcon";
import EditableMarkdownEditor from "@/app/components/shared/markdown-editor/EditableMarkdownEditor";
import { Note } from "@/app/interfaces";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  note: Note;
  setUpdatedNote: Dispatch<SetStateAction<Note>>;
}

export const ModalTextDetail = ({ note, setUpdatedNote }: Props) => {
  const noteLength = note.content.length;
  const router = useRouter();

  function handleNoteContentChange(richText: string) {
    setUpdatedNote((prev) => ({
      ...prev,
      content: richText,
    }));
  }

  function handleNoteTitleChange(title: string) {
    setUpdatedNote((prev) => ({
      ...prev,
      title,
    }));
  }

  async function handleDeleteNote() {
    await NoteActions.deleteNote(note.id);
  }

  useEffect(() => {
    function handleFocusModeWithKeys(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        router.push(`/${note.id}?focus=true`);
      }
    }
    document.addEventListener("keydown", handleFocusModeWithKeys);

    return () => {
      document.removeEventListener("keydown", handleFocusModeWithKeys);
    };
  }, [note.id, router]);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 z-50 m-12"
      id="backdrop-container"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      key={note.id + note.content + note.title}
    >
      <div
        className="flex w-full h-full p-2 transition-all duration-100 bg-white rounded-xl"
        id="backdrop-item"
      >
        <div className="absolute top-0 left-0 inline-flex gap-4 p-6">
          <Link
            href={`/${note.id}?focus=true`}
            className="inline-flex items-center gap-2 group"
          >
            <Image
              src="https://static.accelerator.net/134/0.27.1/icons/focus-circle-light.png"
              alt="Toggle Focus Mode"
              height={24}
              width={24}
              className="opacity-100 blur-[2px] hover:blur-0 transition-all duration-150 ease-linear hover:animate-spin "
            />
            <div
              className="px-4 py-1 text-sm bg-[#F0F2F5] rounded-lg text-black font-medium !pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 ease-linear"
              style={{
                boxShadow: "10px 10px 20px rgb(0 0 0 / 10%)",
              }}
            >
              Focus (Ctrl + F)
            </div>
          </Link>
        </div>
        <div
          className="flex flex-col items-center justify-center flex-1 h-full overflow-x-hidden overflow-y-auto overscroll-behavior-y-contain scrollbar-gutter-stable"
          style={{
            scrollbarColor: "#D0D8E5 transparent",
            marginRight: noteLength > 200 ? "0.5rem" : "0",
          }}
        >
          <div className="w-full max-w-3xl max-h-full 2xl:max-w-4xl">
            <div className="px-6 py-12">
              <EditableMarkdownEditor
                content={note.content}
                onChange={handleNoteContentChange}
              />
            </div>
          </div>
        </div>

        {/* Right side */}
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
              onChange={(e) => handleNoteTitleChange(e.target.value)}
              defaultValue={note.title || ""}
            />
          </header>

          <div className="flex items-center justify-center w-full p-5">
            <button
              className="p-3 bg-white rounded-full hover:bg-[#748297] group transition-all ease-linear"
              title="Delete card"
              onClick={handleDeleteNote}
            >
              <TrashIcon className="group-hover:fill-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
