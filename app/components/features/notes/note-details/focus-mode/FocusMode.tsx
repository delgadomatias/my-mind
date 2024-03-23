import { NoteActions } from "@/app/actions";
import { MotionDiv } from "@/app/components/shared/MotionDiv";
import EditableMarkdownEditor from "@/app/components/shared/markdown-editor/EditableMarkdownEditor";
import { useKey } from "@/app/hooks";
import { Note } from "@/app/interfaces";
import { DEFAULT_NOTE_CONTENT } from "@/app/utils/constants";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./focus-mode.module.css";

interface Props {
  note: Note;
}

export const FocusMode = ({ note }: Props) => {
  const [updatedNote, setUpdatedNote] = useState(note);
  const router = useRouter();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function handleNoteTitleChange(title: string) {
    setUpdatedNote((prev) => ({
      ...prev,
      title,
    }));
  }

  function handleNoteContentChange(richText: string) {
    setUpdatedNote((prev) => ({
      ...prev,
      content: richText,
    }));
  }

  function handleBack() {
    const { content } = updatedNote;

    if (note.content === content && note.title === updatedNote.title) {
      router.push("/");
      return;
    }

    if (DEFAULT_NOTE_CONTENT === content) {
      router.push("/");
      NoteActions.deleteNote(note.id);
      return;
    }

    NoteActions.updateNote({ ...updatedNote });
    router.push("/");
  }

  useKey({
    key: "Escape",
    callback: handleBack,
  });

  useEffect(() => {
    if (textAreaRef.current) {
      const height = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = `${height}px`;
    }
  }, [textAreaRef.current?.scrollHeight]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function onTextAreaInput() {
    if (textAreaRef.current) {
      const height = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = `${height}px`;
    }
  }

  useEffect(() => {
    if (textAreaRef.current && !textAreaRef.current.value) {
      textAreaRef.current.style.height = `${96}px`;
    }
  }, [textAreaRef.current?.value]);

  return (
    <>
      <MotionDiv className="absolute top-0 z-50 h-full w-full">
        <Image
          src="/media/expanded-note-bg.jpg"
          alt="Hola"
          height={100}
          width={100}
          className="inset-0 h-screen w-full opacity-100"
          classNames={{
            wrapper: "!max-w-full w-full h-full absolute",
          }}
        />
        <section className="relative z-50 mx-auto flex h-full w-full max-w-screen-md flex-col items-start justify-start overflow-y-auto py-20">
          <textarea
            className="focus-none mb-4 h-auto w-full resize-none overflow-hidden bg-transparent pb-12 font-louize text-5xl tracking-[-.03em] text-[#232a35] outline-none"
            placeholder={"Type your headline here..."}
            onChange={(e) => handleNoteTitleChange(e.target.value)}
            defaultValue={note.title || ""}
            ref={textAreaRef}
            onInput={onTextAreaInput}
          />
          <div className="flex flex-col items-center justify-center">
            <EditableMarkdownEditor
              className={styles.editorFocusMode}
              content={note.content}
              onChange={handleNoteContentChange}
            />
          </div>
        </section>
      </MotionDiv>
      <button
        className="absolute right-0 top-0 z-50 cursor-pointer p-6"
        onClick={handleBack}
      >
        <span className="flex h-full w-full items-center justify-center rounded-full bg-white p-1 hover:animate-appearance-in">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M197.66,69.66,83.31,184H168a8,8,0,0,1,0,16H64a8,8,0,0,1-8-8V88a8,8,0,0,1,16,0v84.69L186.34,58.34a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </span>
      </button>
    </>
  );
};
