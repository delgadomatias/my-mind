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
import { FC, useEffect } from "react";

import styles from "./editor.module.css";

interface EditorProps extends MDXEditorProps {
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const Editor: FC<EditorProps> = ({ markdown, editorRef, ...rest }) => {
  useEffect(() => {
    const editor = document.querySelector(
      ".add-note-editor .mdxeditor-root-contenteditable"
    ) as HTMLElement;

    const contentEditable = editor.querySelector(
      'div[contenteditable="true"]'
    ) as HTMLElement | null;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (contentEditable) {
          contentEditable.innerHTML = contentEditable.innerHTML.replace(
            /<p><br \/><\/p>/g,
            ""
          );

          contentEditable.innerHTML += "<p><br /></p>";
        }
      }
    }

    editor.addEventListener("keydown", handleKeyDown);

    return () => {
      editor.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
