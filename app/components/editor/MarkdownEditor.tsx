import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import dynamic from "next/dynamic";

const EditorComp = dynamic(() => import("./EditorComponent"), {
  ssr: false,
  loading: () => <div className="size-96"></div>,
});

interface Props extends MDXEditorProps {
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

export const MarkdownEditor = (props: Props) => {
  return <EditorComp {...props} />;
};
