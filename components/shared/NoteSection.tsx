import { Suspense } from "react";
import { NoteList } from "../features/notes/NoteList";
import { AddNoteMobile } from "../features/notes/add-note/AddNoteMobile";
import { SearchNoteContainer } from "../features/search-note/SearchNoteContainer";

export const NoteSection = () => {
  return (
    <div className="container mx-auto max-w-[98%] p-4 md:max-w-[99.5%] lg:w-[calc(100%_-_10rem)] lg:p-0">
      <Suspense>
        <SearchNoteContainer />
      </Suspense>
      <AddNoteMobile />
      <NoteList />
    </div>
  );
};
