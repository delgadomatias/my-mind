import MarkdownEditor from "@/app/components/shared/markdown-editor/MarkdownEditor";

interface Props {
  content: string;
}

// This note is used to render the text in the note content. Only TEXT
export const NoteText = ({ content }: Props) => {
  const { length } = content;
  const longStyles = {
    maxHeight: "min(30vh, 295px)",
    overflow: "hidden",
    contain: "paint",
  };

  return (
    <div
      className={`w-full -z-10 ${length > 300 ? "note-long" : ""}`}
      style={length > 300 ? longStyles : {}}
    >
      <MarkdownEditor
        content={content}
        className="bg-white shadow-xl rounded-lg w-full px-6 py-4"
      />
    </div>
  );
};
