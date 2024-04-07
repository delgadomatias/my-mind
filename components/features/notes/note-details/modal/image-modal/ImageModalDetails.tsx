"use client";

import { NoteActions } from "@/actions";
import { Note } from "@/interfaces";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BackdropShadow } from "../../BackdropShadow";
import { CardActions } from "../sidebar/CardActions";
import { SidebarModal } from "../sidebar/SidebarModal";

interface Props {
  note: Note;
  dominantColor: string;
  src: string;
}

export const ImageModalDetails = ({ note, dominantColor, src }: Props) => {
  const [updatedNote, setUpdatedNote] = useState(note);
  const router = useRouter();

  function handleUpdateNote() {
    if (note.title === updatedNote.title) return;
    NoteActions.updateNote(updatedNote);
  }

  function handleCloseOnMobile() {
    handleUpdateNote();
    router.back();
  }

  async function onDeleteNote() {
    await NoteActions.deleteNote(note.id);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add("lg:overflow-hidden");

    return () => {
      document.body.classList.remove("lg:overflow-hidden");
    };
  }, []);

  return (
    <>
      <BackdropShadow onUpdateNote={handleUpdateNote} closeOnEscape />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-0 z-50 lg:m-12"
        id="backdrop-container"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="relative flex h-[430px] w-full flex-col bg-white transition-all duration-100 sm:h-[600px] lg:h-full lg:flex-row lg:rounded-xl lg:p-2 lg:pb-2"
          id="backdrop-item"
          style={{
            backgroundColor: dominantColor,
          }}
        >
          <div className="absolute left-0 top-0 inline-flex h-20 w-full justify-between gap-4 p-6 lg:hidden">
            <button onClick={handleCloseOnMobile}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            </button>
            <input
              type="text"
              className="m-0 flex-1 overflow-hidden text-ellipsis border-none bg-transparent text-center text-lg font-normal text-[#000] "
              placeholder="Untitled"
              maxLength={100}
              defaultValue={note.title || "Untitled"}
              onChange={(e) => {
                setUpdatedNote((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
          </div>
          {/* Left side */}
          <div className="mt-[80px] flex w-full items-center justify-center px-6 pb-6">
            <Image
              alt="Image"
              height={800}
              src={src}
              width={800}
              className="aspect-square h-[327px] max-h-full !w-full max-w-full rounded-none object-cover opacity-100 lg:h-full lg:w-full lg:rounded-xl"
              classNames={{
                wrapper: "lg:h-[80%] w-full",
              }}
            />
          </div>

          {/* Right side */}
          <SidebarModal note={updatedNote} setUpdatedNote={setUpdatedNote} />
        </div>

        <div className="block h-full w-full bg-[#F0F2F5] lg:hidden">
          <CardActions onDeleteNote={onDeleteNote} />
        </div>
      </motion.div>
    </>
  );
};
