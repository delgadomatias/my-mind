"use client";

import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import styles from "./editor.module.css";

const Editor = dynamic(() => import("./InitializedMDXEditor"), {
  ssr: false,
  loading: () => <div className="h-[84px]"></div>,
});

export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => (
    <Editor
      {...props}
      editorRef={ref}
      className={`${styles.editor} ${props.className}`}
    />
  )
);

ForwardRefEditor.displayName = "ForwardRefEditor";
