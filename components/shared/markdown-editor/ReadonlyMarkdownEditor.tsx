import MarkdownEditor, { MarkdownEditorProps } from "./MarkdownEditor";

const ReadonlyMarkdownEditor = (props: MarkdownEditorProps) => {
  return <MarkdownEditor {...props} />;
};

export default ReadonlyMarkdownEditor;
