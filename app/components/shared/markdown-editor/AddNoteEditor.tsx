"use client";

import { NoteActions } from "@/app/actions";
import { Extension, Extensions } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { motion } from "framer-motion";
import { MarkdownEditorProps } from "./MarkdownEditor";
import { RichTextLink } from "./extensions/RichLink";
import styles from "./markdown-editor.module.css";

const AddNoteEditor = ({
  content = "",
  onAddNote,
  onBlur,
  onChange,
  onFocus,
  isTyping,
}: MarkdownEditorProps & {
  isTyping: boolean;
}) => {
  async function onCreateNote(content: string) {
    await NoteActions.createNote({ content });
  }

  const AddNoteExtension = Extension.create({
    addKeyboardShortcuts() {
      return {
        "Ctrl-Enter": () => {
          onAddNote && onAddNote();
          const content = this.editor.getHTML();
          onCreateNote(content);

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
    Image.configure({ allowBase64: true }),
    AddNoteExtension,
    RichTextLink.configure({
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer",
        class: "underline text-blue-500",
        spellcheck: "false",
      },
    }),
  ];

  const editor = useEditor({
    editable: true,
    extensions,
    content,
    editorProps: {
      attributes: {
        class: `${styles.editor} ${styles.editableMarkdownEditor}`,
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

  function handleAddNoteViaClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newNote = {
      content: editor?.getHTML() || "",
    };

    NoteActions.createNote(newNote);
    editor?.commands.clearContent();
    editor?.commands.blur();
    onAddNote && onAddNote();
  }

  if (!editor) {
    return null;
  }

  return (
    <>
      <EditorContent editor={editor} className="w-full" />
      <motion.button
        className="absolute top-0 right-0 w-40 h-full p-2 text-center transition-all ease-in duration-800"
        style={{
          pointerEvents: isTyping ? "auto" : "none",
          zIndex: 999,
        }}
        onClick={handleAddNoteViaClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: isTyping ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="h-full w-full bg-[#ff5924] flex items-center justify-center px-4 rounded-md">
          <span className="text-sm" id="command-key"></span>
        </div>
      </motion.button>
    </>
  );
};

export default AddNoteEditor;
