import { Suspense } from "react";
import { NoteContainer } from "../features/notes/NoteContainer";
import { NoteList } from "../features/notes/NoteList";

export const NoteSection = () => {
  return (
    <div className="container mx-auto max-w-[98%] p-4 md:max-w-[99.5%] lg:w-[calc(100%_-_10rem)] lg:p-0">
      <Suspense>
        <NoteContainer />
      </Suspense>
      <NoteList />
    </div>
  );
};
