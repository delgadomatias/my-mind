"use client";

import AddNoteEditor from "@/components/shared/markdown-editor/AddNoteEditor";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const AddNoteMobile = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) return;
    function handleScroll(event: Event) {
      if (ref.current) {
        const { scrollY } = window;

        if (scrollY > 0) {
          ref.current.classList.add("hidden");
        } else {
          ref.current.classList.remove("hidden");
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div className="z-50 bg-[#F0F2F5] lg:hidden">
        <motion.div
          className="absolute inset-0 z-50 h-full w-full bg-black/70"
          onClick={() => setIsOpen(false)}
          style={{
            display: isOpen ? "block" : "none",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
        >
          <div className="flex h-[10%] items-center justify-end px-4">
            <button className="rounded-xl bg-[#ff5924] px-6 py-2 font-semibold text-white">
              Save
            </button>
          </div>
        </motion.div>

        <motion.div
          className="fixed z-50 mx-auto min-h-20 w-[calc(100%_-_2rem)]  bg-white px-4 py-2 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
          style={{
            bottom: isOpen ? "0" : "-8px",
            marginBottom: isOpen ? "1rem" : "0",
            borderRadius: isOpen ? "0.5rem" : "1rem 1rem 0 0",
          }}
          initial={{ height: 0 }}
          animate={{ height: isOpen ? "88%" : 0 }}
          ref={ref}
          onClick={() => setIsOpen(true)}
        >
          <AddNoteEditor isTyping={false} />
        </motion.div>
      </div>
    </>
  );
};
