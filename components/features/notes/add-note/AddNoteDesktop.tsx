import { MotionDiv } from "@/components/shared/MotionDiv";
import AddNoteEditor from "@/components/shared/markdown-editor/AddNoteEditor";

interface Props {
  handleOnChange: (richText: string) => void;
  isSaving: boolean;
  isTyping: boolean;
  onAddNote: () => void;
  onFocus: () => void;
}

export const AddNoteDesktop = (props: Props) => {
  const { handleOnChange, isSaving, isTyping, onAddNote, onFocus } = props;

  return (
    <div className="relative hidden min-h-52 rounded-md bg-white px-6 py-4 shadow-xl transition-shadow duration-75 ease-linear hover:shadow-[20px_20px_40px_#BABFC2] lg:block">
      <label className="select-none text-[clamp(8px,8cqw,12px)] font-medium uppercase leading-[1] tracking-[0.1em] text-[#ff5924]">
        Add a new note
      </label>
      <AddNoteEditor
        isTyping={isTyping}
        onAddNote={onAddNote}
        onChange={handleOnChange}
        onFocus={onFocus}
      />
      <MotionDiv
        className="duration-800 pointer-events-none absolute bottom-0 left-0 right-0 w-full select-none text-center transition-all ease-in"
        style={{
          zIndex: isSaving ? 100 : -1,
        }}
        initial={{ opacity: 0, height: "0%" }}
        animate={{
          opacity: isSaving ? 1 : 0,
          height: isSaving ? "100%" : "60%",
        }}
        exit={{ opacity: 0, height: "60%" }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-md bg-[#ff5924] p-1">
          <p className="text-md text-white">I&apos;ll remember this for you</p>
        </div>
      </MotionDiv>
    </div>
  );
};
