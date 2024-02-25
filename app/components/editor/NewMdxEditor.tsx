import {
  MDXEditor,
  MDXEditorMethods,
  MDXEditorProps,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import { FC } from "react";

interface Props extends MDXEditorProps {
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const NewMdxEditor: FC<Props> = (props) => {
  return (
    <MDXEditor
      {...props}
      ref={props.editorRef}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  );
};

export default NewMdxEditor;
