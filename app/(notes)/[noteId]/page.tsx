"use client";

import { useNoteContext } from "@/app/context/notes";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const TipTapComponent = dynamic(() => import("@/components/TipTapEditor"), {
  ssr: false,
});

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
      <button
        className="absolute top-0 w-full h-[5%] flex items-center justify-center"
        id="close-backdrop"
        style={{
          zIndex: 100,
        }}
        onClick={() => router.back()}
      >
        <div className="hidden text-white opacity-60" id="close-backdrop-label">
          ESC to close card
        </div>
      </button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-80 h-screen"
        id="backdrop-shadow"
      ></motion.div>

      <div
        className="h-screen sticky inset-0 z-50 flex items-center justify-center group"
        id="backdrop-container"
      >
        <motion.div
          className="p-2 bg-white w-[95%] h-[90%] rounded-lg shadow-md flex  items-center transition-transform ease-linear duration-100"
          id="backdrop"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="flex-1 flex items-center justify-center overflow-y-scroll py-12 mr-2 max-h-[90%]"
            style={{
              scrollbarColor: "#D0D8E5 transparent",
              overflowX: "hidden",
              overscrollBehaviorY: "contain",
              flexFlow: "column",
              scrollbarGutter: "stable",
            }}
          >
            <div className="max-w-2xl 2xl:max-w-4xl max-h-full ">
              <TipTapComponent content={note.content} editable />
            </div>
          </div>
          <div className="bg-[#F0F2F5] h-full w-[400px] rounded-lg">
            <header
              className="h-24 py-5 px-7 rounded-lg rounded-bl-none rounded-br-none"
              style={{
                background:
                  "linear-gradient(180deg, #D1D9E6 0%, #EAEDF1 105%, #EAEDF1 105%)",
              }}
            >
              <input
                type="text"
                placeholder="Title goes here"
                className="text-[#505864] bg-transparent w-full text-ellipsis border-none text-3xl font-light focus:outline-none focus:text-black"
              />
            </header>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NoteDetail;
