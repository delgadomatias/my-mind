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
      <MotionDiv
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "backInOut" }}
        className="absolute top-0 z-50 w-full h-full"
      >
        <Image
          src="/media/expanded-note-bg.jpg"
          alt="Hola"
          height={100}
          width={100}
          className="inset-0 w-full h-screen opacity-100"
          classNames={{
            wrapper: "!max-w-full w-full h-full absolute",
          }}
        />
        <section className="relative z-50 flex flex-col items-start justify-start w-full h-full max-w-screen-md py-20 mx-auto">
          <textarea
            className="text-[#232a35] bg-transparent outline-none focus-none text-5xl mb-4 h-auto font-louize tracking-[-.03em] w-full overflow-hidden resize-none"
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
      <button className="absolute top-0 right-0 z-50 p-6" onClick={handleBack}>
        Volver
      </button>
    </>
  );
};
