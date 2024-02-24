"use client";

import "@mdxeditor/editor/style.css";
import { useState } from "react";
import { ForwardRefEditor } from "./editor/ForwardRefEditor";

export const AddNote = () => {
  const [isTyping, setIsTyping] = useState(false);

  function handleOnChange(markdown: string) {
    if (markdown.length > 0) {
      setIsTyping(true);
      return;
    }

    setIsTyping(false);
  }

  return (
    <div className="relative group">
      {!isTyping && (
        <p className="absolute top-0 py-2 text-6xl italic transition-all duration-200 ease-in opacity-30 group-hover:opacity-10">
          Start typing here...
        </p>
      )}
      <ForwardRefEditor markdown="" onChange={handleOnChange} />
      <div className="h-1 mx-auto my-2">
        <hr className="w-full h-full group-hover:bg-black/[0.1] transition-all duration-200 ease-in" />
      </div>
    </div>
  );
};
