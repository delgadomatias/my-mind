import MarkdownEditor from "@/components/shared/markdown-editor/MarkdownEditor";

interface Props {
  content: string;
  noteId: string;
  title: string;
}

// This note is used to render the text in the note content. Only TEXT
export const NoteText = ({ content, noteId, title }: Props) => {
  const { length } = content;
  const longStyles = {
    maxHeight: "min(30vh, 295px)",
    overflow: "hidden",
    contain: "paint",
  };

  return (
    <div
      className={`w-full -z-10 ${length > 800 ? "note-long" : ""} bg-white rounded-lg shadow-xl px-6 py-4`}
      style={length > 800 ? longStyles : {}}
    >
      <MarkdownEditor
        content={content}
        className="w-full"
        key={noteId + content + title}
      />
    </div>
  );
};
