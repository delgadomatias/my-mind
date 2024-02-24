"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ForwardRefEditor } from "./editor/ForwardRefEditor";

export const Note = () => {
  return (
    <div className="my-4">
      <Link
        href="/1231231"
        className="hover:border-[#B8C3D3] max-w-fit rounded-md flex hover:border-4 border-4 border-transparent transition-all duration-50 ease-linear"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ForwardRefEditor
            markdown="Mi primera nota"
            className="p-6 bg-white rounded-md shadow-md max-w-fit non-editable hover:bg-red-500 "
          />
        </motion.div>
      </Link>
    </div>
  );
};
