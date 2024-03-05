"use client";

import { useNoteContext } from "@/context/notes";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, Extension, Extensions, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./markdown-editor.module.css";

export interface MarkdownEditorProps {
  content?: string;
  editable?: boolean;
  onAddNote?: () => void;
  onBlur?: () => void;
  onChange?: (richText: string) => void;
  onFocus?: () => void;
  supportAddNote?: boolean;
  className?: string;
}

const MarkdownEditor = ({
  content = "",
  editable = false,
  onAddNote,
  onBlur,
  onChange,
  onFocus,
  supportAddNote = false,
  className = "",
}: MarkdownEditorProps) => {
  const { addNote } = useNoteContext();

  const AddNoteExtension = Extension.create({
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

  let extensions: Extensions = [
    StarterKit,
    Placeholder.configure({ placeholder: "Start typing here..." }),
    Image,
    Link.configure({
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer",
      },
    }),
  ];

  if (supportAddNote) {
    extensions = [...extensions, AddNoteExtension];
  }

  const editor = useEditor({
    editable,
    extensions,
    content,
    editorProps: {
      attributes: {
        class: `${styles.editor} ${className}`,
      },
    },
    onUpdate: ({ editor }) => {
      const richText = editor.getHTML();
      onChange && onChange(richText);
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

  return <EditorContent editor={editor} className="w-full" />;
};

export default MarkdownEditor;
