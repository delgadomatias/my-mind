"use client";

import {
  MDXEditor,
  MDXEditorMethods,
  MDXEditorProps,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
} from "@mdxeditor/editor";
import { FC } from "react";

import styles from "./editor.module.css";

interface EditorProps extends MDXEditorProps {
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const Editor: FC<EditorProps> = ({ markdown, editorRef, ...rest }) => {
  return (
    <MDXEditor
      ref={editorRef}
      markdown={markdown}
      {...rest}
      className={`${rest.className} ${styles.editor}`}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  );
};

export default Editor;