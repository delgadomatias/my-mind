import { ListenDragAndDrop } from "@/components/features/drag-and-drop/ListenDragAndDrop";
import { ListenHashChange } from "@/components/features/notes/note-details/ListenHashChange";
import { MainAside } from "@/shared/MainAside";
import { NoteSection } from "@/shared/NoteSection";

const HomePage = () => {
  return (
    <>
      <MainAside />
      <NoteSection />
      <ListenHashChange />
      <ListenDragAndDrop />
    </>
  );
};

export default HomePage;
