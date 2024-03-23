import { NoteActions } from "@/app/actions";
import EditableMarkdownEditor from "@/app/components/shared/markdown-editor/EditableMarkdownEditor";
import { Note } from "@/app/interfaces";
import { DEFAULT_NOTE_CONTENT } from "@/app/utils/constants";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BackdropShadow } from "../../BackdropShadow";
import { SidebarModal } from "../sidebar/SidebarModal";

interface Props {
  note: Note;
}

export const TextModalDetails = ({ note }: Props) => {
  const [updatedNote, setUpdatedNote] = useState(note);
  const noteLength = note.content.length;
  const router = useRouter();

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
    <>
      <BackdropShadow onUpdateNote={handleUpdateNote} closeOnEscape />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-0 z-50 m-12"
        id="backdrop-container"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        key={note.id + note.content + note.title}
      >
        <div
          className="flex h-full w-full rounded-xl bg-white p-2 transition-all duration-100"
          id="backdrop-item"
        >
          <div className="absolute left-0 top-0 inline-flex gap-4 p-6">
            <Link
              href={`/${note.id}?focus=true`}
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
          <div
            className="overscroll-behavior-y-contain scrollbar-gutter-stable flex h-full flex-1 flex-col items-center justify-center overflow-y-auto overflow-x-hidden"
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
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <SidebarModal
            noteId={note.id}
            setUpdatedNote={setUpdatedNote}
            title={note.title || ""}
          />
        </div>
      </motion.div>
    </>
  );
};
