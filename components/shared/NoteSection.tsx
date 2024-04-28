import { NoteList } from "../features/notes/NoteList";
import { AddNoteMobile } from "../features/notes/add-note/AddNoteMobile";
import { SearchNoteContainer } from "../features/search-note/SearchNoteContainer";
import { TopOfMind } from "./top-of-mind/TopOfMind";

export const NoteSection = () => {
  return (
    <div className="container mx-auto max-w-[98%] p-4  md:max-w-[99.5%] lg:w-[calc(100%_-_10rem)] lg:p-0 lg:pb-6">
      <SearchNoteContainer />
      <TopOfMind />
      <AddNoteMobile />
      <NoteList />
    </div>
  );
};
