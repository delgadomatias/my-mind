import EditableMarkdownEditor from "@/app/components/shared/markdown-editor/EditableMarkdownEditor";
import { Note } from "@/app/interfaces";
import { useRouter } from "next/navigation";
import styles from "./focus-mode.module.css";

interface Props {
  note: Note;
}

export const FocusMode = ({ note }: Props) => {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <>
      <div
        className="absolute top-0 z-50 w-full h-full"
        style={{
          background:
            "url(https://static.accelerator.net/134/0.27.1/images/expanded-note-bg.jpg) top center / cover no-repeat",
        }}
      >
        <section className="flex flex-col items-start justify-center w-full h-full max-w-screen-md mx-auto ">
          <input
            type="text"
            className="text-[#232a35] bg-transparent outline-none focus-none text-5xl mb-4 opacity-50"
            value={note.title || "Type your headline here."}
          />
          <div className="flex flex-col items-center justify-center">
            <EditableMarkdownEditor
              content={note.content}
              className={styles.editorFocusMode}
            />
          </div>
        </section>
      </div>
      <button className="absolute top-0 right-0 z-50 p-6" onClick={handleBack}>
        Volver
      </button>
    </>
  );
};
