"use client";

import {
  MDXEditorMethods,
  MDXEditorProps,
  headingsPlugin,
} from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { FC } from "react";

const NewMdxEditor = dynamic(() => import("./NewMdxEditor"), { ssr: false });

interface EditorProps extends MDXEditorProps {
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const Editor: FC<EditorProps> = ({ markdown, editorRef, onChange }) => {
  return (
    <NewMdxEditor
      editorRef={editorRef}
      markdown={markdown}
      onChange={onChange}
      plugins={[headingsPlugin()]}
    />
  );
};

export default Editor;
