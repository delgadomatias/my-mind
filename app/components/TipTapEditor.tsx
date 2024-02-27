"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, Extension, useEditor } from "@tiptap/react";

import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import { useNoteContext } from "../context/notes";

interface Props {
  content?: string;
  editable?: boolean;
  onAddNote?: () => void;
  onBlur?: () => void;
  onChange?: (richText: string) => void;
  onFocus?: () => void;
}

const Tiptap = ({
  content = "",
  editable = false,
  onAddNote,
  onBlur,
  onChange,
  onFocus,
}: Props) => {
  const { addNote } = useNoteContext();

  const PreventLineBreak = Extension.create({
    addKeyboardShortcuts() {
      return {
        "Ctrl-Enter": () => {
          onAddNote && onAddNote();
          const content = this.editor.getHTML();

          addNote({
            content,
            createdAt: new Date(),
            id: Date.now().toString(),
          });

          this.editor.commands.clearContent();
          this.editor.commands.blur();
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    editable,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing here...",
      }),
      PreventLineBreak,
      Link.configure({
        protocols: ["http", "https"],
        openOnClick: false,
        autolink: true,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange && onChange(editor.getHTML());
    },
    onBlur: () => {
      onBlur && onBlur();
    },
    onFocus: () => {
      onFocus && onFocus();
    },
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
};

export default Tiptap;
