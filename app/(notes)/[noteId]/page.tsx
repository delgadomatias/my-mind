"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  params: {
    noteId: string;
  };
}

const NoteDetail = ({ params }: Props) => {
  const router = useRouter();
  const { noteId } = params;

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        router.push("/");
      }
    });
  }, [router]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-80"
      ></motion.div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          className="p-6 bg-white rounded-md shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Detalle de la nota {noteId}</h1>
        </motion.div>
      </div>
    </div>
  );
};

export default NoteDetail;
