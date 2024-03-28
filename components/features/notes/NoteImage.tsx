import MarkdownEditor from "@/components/shared/markdown-editor/MarkdownEditor";

interface Props {
  content: string;
}

// This component is used to render the image in the note content. Only IMAGE
export const NoteImage = ({ content }: Props) => {
  return (
    <MarkdownEditor
      content={content}
      className="w-full rounded-lg bg-white shadow-xl"
    />
  );
};
