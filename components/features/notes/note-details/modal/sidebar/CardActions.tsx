import { MotionDiv } from "@/components/shared/MotionDiv";
import { PaperclipIcon } from "@/components/shared/icons/PaperclipIcon";
import { TrashIcon } from "@/components/shared/icons/TrashIcon";
import { Tooltip } from "@/components/shared/ui/Tooltip";
import { Note } from "@/interfaces";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShareButton } from "./ShareButton";

interface Props {
  onDeleteNote: () => void;
  note: Note;
}

type ActionsState = {
  isShared: boolean;
  sharedUrl: string | null;
};

export const CardActions = ({ onDeleteNote, note }: Props) => {
  const [actionsState, setActionsState] = useState<ActionsState>({
    isShared: note.is_shared,
    sharedUrl: `${window.location.origin}/shares/${note.shared_id}`,
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 p-5">
      <div className="inline-flex gap-3">
        <Tooltip text="Delete card">
          <button
            className="group relative flex items-center justify-center rounded-full bg-white p-3 transition-all ease-linear hover:bg-[#748297]"
            onClick={onDeleteNote}
          >
            <TrashIcon className="group-hover:fill-white" />
          </button>
        </Tooltip>

        <ShareButton
          isShared={actionsState.isShared}
          onDeleteNote={onDeleteNote}
          setActionsState={setActionsState}
          noteId={note.id}
        />
      </div>
      <AnimatePresence>
        {actionsState.isShared && (
          <MotionDiv
            className="relative w-full rounded-lg bg-white p-2"
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            initial={{ opacity: 0, y: 30 }}
          >
            <p className="inline-block max-w-full overflow-clip text-ellipsis text-nowrap pr-9 font-normal text-[#ADB7C8]">
              Share with a friend:{" "}
              <a
                className="text-[#ff5924]"
                href={actionsState.sharedUrl!}
                target="_blank"
              >
                {actionsState.sharedUrl}
              </a>
            </p>
            <div className="absolute bottom-0 right-3 top-0 flex items-center justify-center">
              <PaperclipIcon />
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};
