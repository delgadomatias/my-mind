import MarkdownEditor from "@/app/components/shared/markdown-editor/MarkdownEditor";

interface Props {
  content: string;
}

// This component is used to render the image in the note content. Only IMAGE
export const NoteImage = ({ content }: Props) => {
  return (
    <MarkdownEditor
      content={content}
      className="w-full bg-white rounded-lg shadow-xl"
    />
  );
};
