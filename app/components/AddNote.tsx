"use client";

import { useNoteContext } from "@/app/context/notes";
import { MDXEditorMethods } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const EditorComp = dynamic(() => import("./editor/EditorComponent"), {
  ssr: false,
  loading: () => <div className="h-[84px]"></div>,
});

export const AddNote = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [isInEditor, setIsInEditor] = useState(false);
  const [rawMarkdown, setRawMarkdown] = useState("");
  const { addNote } = useNoteContext();
  const ref = useRef(null) as React.MutableRefObject<MDXEditorMethods | null>;

  function handleOnChange(markdown: string) {
    if (markdown.length > 0) {
      setIsTyping(true);
      setRawMarkdown(markdown);
      return;
    }

    setIsTyping(false);
  }

  useEffect(() => {
    if (!isInEditor) return;

    const keydownHandler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        if (rawMarkdown.length === 0) return;
        document.querySelector("div[contenteditable=true]")?.blur();
        addNote({
          content: rawMarkdown,
          id: Date.now().toString(),
        });
        ref.current?.setMarkdown("");
        setRawMarkdown("");
        setIsTyping(false);
      }
    };

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [isInEditor, rawMarkdown, addNote]);

  function handleOnBlur() {
    setIsInEditor(false);
  }

  function handleOnFocus() {
    setIsInEditor(true);
  }

  return (
    <div
      className="relative group"
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
    >
      {!isTyping && (
        <p className="absolute top-0 py-2 text-6xl italic transition-all duration-200 ease-in opacity-30 group-hover:opacity-10">
          Start typing here...
        </p>
      )}
      <EditorComp
        editorRef={ref}
        markdown={rawMarkdown}
        onChange={handleOnChange}
      />
      <div className="h-1 mx-auto my-2">
        <hr className="w-full h-full group-hover:bg-black/[0.1] transition-all duration-200 ease-in" />
      </div>
    </div>
  );
};
