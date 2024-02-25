"use client";

import "@mdxeditor/editor/style.css";
import { useState } from "react";
import { AddNoteEditor } from "./AddNoteEditor";

export const AddNote = () => {
  const [isInEditor, setIsInEditor] = useState(false);

  return (
    <div
      className="relative group"
      onBlur={() => setIsInEditor(false)}
      onFocus={() => setIsInEditor(true)}
    >
      <AddNoteEditor isInEditor={isInEditor} />
      <div className="h-1 mx-auto mb-2">
        <hr className="w-full h-full group-hover:bg-black/[0.1] transition-all duration-200 ease-in bg-black/[0.1] " />
      </div>
    </div>
  );
};
