import ReadonlyMarkdownEditor from "@/app/components/shared/markdown-editor/ReadonlyMarkdownEditor";
import { Note } from "@/app/interfaces";

interface Props {
  note: Note;
  onNoteChange: (richText: string) => void;
}

export const ModalTextDetail = ({ note, onNoteChange }: Props) => {
  const noteLength = note.content.length;

  return (
    <div
      className="flex flex-col items-center justify-center flex-1 h-full overflow-x-hidden overflow-y-auto overscroll-behavior-y-contain scrollbar-gutter-stable"
      style={{
        scrollbarColor: "#D0D8E5 transparent",
        marginRight: noteLength > 200 ? "0.5rem" : "0",
      }}
    >
      <div className="w-full max-w-3xl max-h-full 2xl:max-w-4xl">
        <div className="py-12">
          <ReadonlyMarkdownEditor
            content={note?.content}
            editable
            onChange={onNoteChange}
          />
        </div>
      </div>
    </div>
  );
};
