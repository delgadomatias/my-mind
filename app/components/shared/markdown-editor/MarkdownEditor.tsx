"use client";

import { useNoteContext } from "@/context/notes";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, Extension, Extensions, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Plugin } from "prosemirror-state";
import { RichTextLink } from "./extensions/RichLink";
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

  const AddImageToNoteExtension = Extension.create({
    addProseMirrorPlugins() {
      return [
        new Plugin({
          props: {
            handleDOMEvents: {
              drop(view, event) {
                const hasFiles =
                  event.dataTransfer &&
                  event.dataTransfer.files &&
                  event.dataTransfer.files.length;

                if (!hasFiles) {
                  return;
                }

                const images = Array.from(event.dataTransfer.files).filter(
                  (file) => /image/i.test(file.type)
                );

                if (images.length === 0) {
                  return;
                }

                event.preventDefault();

                const { schema } = view.state;
                const coordinates = view.posAtCoords({
                  left: event.clientX,
                  top: event.clientY,
                });

                images.forEach((image) => {
                  const reader = new FileReader();

                  reader.onload = (readerEvent) => {
                    const node = schema.nodes.image.create({
                      src: readerEvent.target?.result,
                    });
                    const transaction = view.state.tr.insert(
                      coordinates.pos,
                      node
                    );
                    view.dispatch(transaction);
                  };
                  reader.readAsDataURL(image);
                });
              },
              paste(view, event) {
                const hasFiles =
                  event.clipboardData &&
                  event.clipboardData.files &&
                  event.clipboardData.files.length;

                if (!hasFiles) {
                  return;
                }

                const images = Array.from(event.clipboardData.files).filter(
                  (file) => /image/i.test(file.type)
                );

                if (images.length === 0) {
                  return;
                }

                event.preventDefault();

                const { schema } = view.state;

                images.forEach((image) => {
                  const reader = new FileReader();

                  reader.onload = (readerEvent) => {
                    const node = schema.nodes.image.create({
                      src: readerEvent.target?.result,
                    });
                    const transaction =
                      view.state.tr.replaceSelectionWith(node);
                    view.dispatch(transaction);
                  };
                  reader.readAsDataURL(image);
                });
              },
            },
          },
        }),
      ];
    },
  });

  let extensions: Extensions = [
    StarterKit,
    Placeholder.configure({ placeholder: "Start typing here..." }),
    Image.configure({
      allowBase64: true,
    }),
    AddImageToNoteExtension,
    RichTextLink.configure({
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer",
        class: "underline text-blue-500",
        spellcheck: "false",
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
