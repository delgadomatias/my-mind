import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const AddNoteEditor = dynamic(
  () => import("@/components/shared/markdown-editor/AddNoteEditor"),
  {
    ssr: false,
    loading: () => <div className="h-[54px] w-full"></div>,
  },
);

interface Props {
  handleOnChange: (richText: string) => void;
  isSaving: boolean;
  isSearching: boolean;
  isTyping: boolean;
  noteContent: string;
  onAddNote: () => void;
  onFocus: () => void;
}

export const AddNoteDesktop = (props: Props) => {
  const {
    handleOnChange,
    isSaving,
    isSearching,
    isTyping,
    noteContent,
    onAddNote,
    onFocus,
  } = props;

  return (
    <div className="relative mt-8 hidden lg:block">
      {/* Change this padding on Mobile */}
      {!isSearching && (
        <div className="zpr-40 relative z-10 mb-5 py-2 pl-6 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
          <AddNoteEditor
            content={noteContent}
            isTyping={isTyping}
            onAddNote={onAddNote}
            onChange={handleOnChange}
            onFocus={onFocus}
          />
          {/* Div for show a message */}
          <motion.div
            className="duration-800 absolute inset-0 w-full text-center transition-all ease-in"
            style={{
              zIndex: isSaving ? 100 : -1,
            }}
            initial={{ opacity: 0, width: "0%" }}
            animate={{
              opacity: isSaving ? 1 : 0,
              width: isSaving ? "100%" : "90%",
            }}
            exit={{ opacity: 0, width: "90%" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-full w-full items-center justify-center rounded-md bg-[#ff5924] p-1">
              <p className="text-md text-white">
                I&apos;ll remember this for you
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
