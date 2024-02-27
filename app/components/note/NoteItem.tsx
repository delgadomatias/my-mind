import { Note } from "@/interfaces/note.interface";
import dynamic from "next/dynamic";
import Link from "next/link";

const TipTapComponent = dynamic(() => import("./../TipTapEditor"), {
  ssr: false,
  loading: () => <div className="h-[200px] w-[200px]"></div>,
});

interface Props {
  note: Note;
}

export const NoteItem = ({ note }: Props) => {
  const { id, content } = note;
  const longStyles = {
    maxHeight: "min(30vh, 295px)",
    overflow: "hidden",
    contain: "paint",
  };

  return (
    <Link
      className="hover:border-[#B8C3D3] max-w-full rounded-md flex hover:border-4 border-4 border-transparent transition-all duration-50 ease-linear h-fit break-inside-avoid"
      href={id}
    >
      <div
        className={`bg-white shadow-xl rounded-lg w-full px-6 py-4 ${
          content.length > 350 ? "note-long" : ""
        }`}
        style={content.length > 350 ? longStyles : {}}
      >
        <TipTapComponent content={content} />
      </div>
    </Link>
  );
};
