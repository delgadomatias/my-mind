import MarkdownEditor from "@/components/shared/MarkdownEditor";

interface Props {
  content: string;
}

// This component is used to render the image in the note content. Only IMAGE
export const NoteImage = ({ content }: Props) => {
  return (
    <MarkdownEditor
      content={content}
      className="bg-white shadow-xl rounded-lg w-full"
    />
  );
};
