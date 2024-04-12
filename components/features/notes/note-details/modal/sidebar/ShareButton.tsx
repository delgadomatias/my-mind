import { NoteActions } from "@/actions";
import { ExportIcon } from "@/components/shared/icons/ExportIcon";
import { Tooltip } from "@/components/shared/ui/Tooltip";
import { getDbOnClient } from "@/database/client";
import { intervalToDuration } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type ActionsState = {
  isShared: boolean;
  sharedUrl: string | null;
};

interface Props {
  isShared: boolean;
  onDeleteNote: () => void;
  setActionsState: Dispatch<SetStateAction<ActionsState>>;
  noteId: string;
}

export const ShareButton = ({
  isShared,
  onDeleteNote,
  setActionsState,
  noteId,
}: Props) => {
  const [hoursUntilDisabled, setHoursUntilDisabled] = useState("0h");

  async function handleCreateShareLink() {
    const { id } = await NoteActions.createShareLink(noteId);

    setActionsState((prev) => ({
      ...prev,
      isShared: true,
      sharedUrl: `${window.location.origin}/shares/${id}`,
    }));
  }

  async function handleDisableShareLink() {
    await NoteActions.disableShareLink(noteId);

    setActionsState((prev) => ({
      ...prev,
      isShared: false,
    }));
  }

  useEffect(() => {
    if (!isShared) return;

    async function getHoursUntilDisabled() {
      const zeroPad = (num: number) => String(num).padStart(2, "0");
      const supabase: any = getDbOnClient();
      const data = await supabase
        .from("Share")
        .select("expiration_date")
        .eq("note_id", noteId)
        .filter("active", "is", true)
        .single();

      const { hours = 0, minutes = 0 } = intervalToDuration({
        end: new Date(data?.data.expiration_date),
        start: new Date(),
      });

      if (minutes > 30) {
        setHoursUntilDisabled(`${zeroPad(hours + 1)}h`);
        return;
      }

      setHoursUntilDisabled(`${zeroPad(hours)}h`);
    }

    getHoursUntilDisabled();
  }, [isShared, noteId]);

  if (isShared) {
    return (
      <Tooltip text="Disable private share link">
        <button
          className="group relative z-50 flex items-center justify-center  rounded-full bg-white p-3 text-sm text-[#ff5924]"
          onClick={handleDisableShareLink}
        >
          <div className="absolute inset-0 z-10  rounded-full border-2 border-[#ff5924]"></div>
          {hoursUntilDisabled}
        </button>
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip text="Create private share link">
        <button
          className="group relative flex items-center justify-center rounded-full  bg-white p-3 transition-all ease-linear hover:bg-[#748297]"
          onClick={handleCreateShareLink}
        >
          <ExportIcon className="group-hover:fill-white" />
        </button>
      </Tooltip>
    </>
  );
};
