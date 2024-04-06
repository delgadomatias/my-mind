import { NoteActions } from "@/actions";
import EditableMarkdownEditor from "@/components/shared/markdown-editor/EditableMarkdownEditor";
import { Note } from "@/interfaces";
import { DEFAULT_NOTE_CONTENT } from "@/utils/constants";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BackdropShadow } from "../../BackdropShadow";
import { CardActions } from "../sidebar/CardActions";
import { SidebarModal } from "../sidebar/SidebarModal";

interface Props {
  note: Note;
}

export const TextModalDetails = ({ note }: Props) => {
  const [updatedNote, setUpdatedNote] = useState(note);
  const noteLength = note.content.length;
  const router = useRouter();

  function onDeleteNode() {
    NoteActions.deleteNote(note.id);
    router.back();
  }

  function handleNoteContentChange(richText: string) {
    setUpdatedNote((prev) => ({
      ...prev,
      content: richText,
    }));
  }

  function handleUpdateNote() {
    const { content } = updatedNote;

    if (note.content === content && note.title === updatedNote.title) {
      return;
    }

    if (DEFAULT_NOTE_CONTENT === content) {
      return NoteActions.deleteNote(note.id);
    }

    NoteActions.updateNote({
      ...updatedNote,
    });
  }

  function handleCloseOnMobile() {
    handleUpdateNote();
    router.back();
  }

  useEffect(() => {
    function handleFocusModeWithKeys(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        router.push(`/notes/${note.id}?focus=true`);
      }
    }
    document.addEventListener("keydown", handleFocusModeWithKeys);

    return () => {
      document.removeEventListener("keydown", handleFocusModeWithKeys);
    };
  }, [note.id, router]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <BackdropShadow onUpdateNote={handleUpdateNote} closeOnEscape />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-0 z-50 m-0 lg:m-12"
        id="backdrop-container"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        key={note.id + note.content + note.title}
      >
        <div
          className="flex h-[60vh] w-full flex-col bg-white p-2 transition-all duration-100 lg:h-full lg:flex-row lg:rounded-xl"
          id="backdrop-item"
        >
          <div className="absolute left-0 top-0 hidden gap-4  p-6 lg:inline-flex">
            <Link
              href={`/notes/${note.id}?focus=true`}
              className="group inline-flex items-center gap-2"
            >
              <Image
                src="https://static.accelerator.net/134/0.27.1/icons/focus-circle-light.png"
                alt="Toggle Focus Mode"
                height={24}
                width={24}
                className="opacity-100 blur-[2px] transition-all duration-150 ease-linear hover:animate-spin hover:blur-0 "
              />
              <div
                className="!pointer-events-none rounded-lg bg-[#F0F2F5] px-4 py-1 text-sm font-medium text-black opacity-0 transition-all duration-150 ease-linear group-hover:opacity-100"
                style={{
                  boxShadow: "10px 10px 20px rgb(0 0 0 / 10%)",
                }}
              >
                Focus (Ctrl + F)
              </div>
            </Link>
          </div>
          <div className="absolute left-0 top-0 z-50 inline-flex h-20 w-full justify-between gap-4 bg-white p-6 lg:hidden">
            <button onClick={handleCloseOnMobile}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            </button>
            <input
              type="text"
              className="z-50 m-0 flex-1 overflow-hidden text-ellipsis border-none bg-transparent bg-white text-center text-lg font-normal text-[#000]"
              placeholder="Untitled"
              maxLength={100}
              defaultValue={note.title || "Untitled"}
              onChange={(e) => {
                setUpdatedNote((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
          </div>
          <div
            className="overscroll-behavior-y-contain scrollbar-gutter-stable mt-20 flex h-full flex-1 flex-col items-center justify-center overflow-y-auto overflow-x-hidden lg:mt-0"
            style={{
              scrollbarColor: "#D0D8E5 transparent",
              marginRight: noteLength > 200 ? "0.5rem" : "0",
            }}
          >
            <div className="max-h-full w-full max-w-3xl 2xl:max-w-4xl">
              <div className="px-6 py-12">
                <EditableMarkdownEditor
                  content={note.content}
                  onChange={handleNoteContentChange}
                  className={note.tags?.includes("quote") ? "quote" : ""}
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <SidebarModal setUpdatedNote={setUpdatedNote} note={updatedNote} />
        </div>
        <div className="h-[30vh] bg-[#F0F2F5] lg:hidden">
          <CardActions onDeleteNote={onDeleteNode} />
        </div>
      </motion.div>
    </>
  );
};
