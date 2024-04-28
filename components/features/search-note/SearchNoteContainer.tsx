"use client";
import { Suspense, useEffect, useRef } from "react";
import { ScrolledSearchNote } from "./ScrolledSearchNote";
import { SearchNote } from "./SearchNote";

export const SearchNoteContainer = () => {
  const normalInputRef = useRef<HTMLInputElement>(null);
  const inputScrolled = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 30) {
        normalInputRef.current?.classList.add("hidden");
        inputScrolled.current?.classList.remove("hidden");
        return;
      } else {
        normalInputRef.current?.classList.remove("hidden");
        inputScrolled.current?.classList.add("hidden");
        return;
      }
    }

    window.addEventListener("scrollend", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={inputScrolled}
        className="sticky top-2 z-50 hidden"
        id="search-bar"
      >
        <Suspense>
          <ScrolledSearchNote />
        </Suspense>
      </div>

      <div ref={normalInputRef}>
        <Suspense>
          <SearchNote />
        </Suspense>
      </div>
    </>
  );
};
