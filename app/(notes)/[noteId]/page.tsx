"use client";

import { MarkdownEditor } from "@/app/components/editor/MarkdownEditor";
import { useNoteContext } from "@/app/context/notes";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

interface Props {
  params: {
    noteId: string;
  };
}

const NoteDetail = ({ params }: Props) => {
  const router = useRouter();
  const { noteId } = params;
  const { notes } = useNoteContext();
  const note = useMemo(
    () => notes.find((n) => n.id === noteId),
    [notes, noteId]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [router]);

  if (!note) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-80 h-screen"
      ></motion.div>
      <div className="h-screen fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          className="p-6 bg-white w-[90%] h-[90%] rounded-md shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MarkdownEditor markdown={note.content} />
        </motion.div>
      </div>
    </>
  );
};

export default NoteDetail;
