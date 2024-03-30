import { TrashIcon } from "@/components/shared/icons/TrashIcon";
import { Tooltip } from "@/components/shared/ui/Tooltip";

interface Props {
  onDeleteNote: () => void;
}

export const CardActions = ({ onDeleteNote }: Props) => {
  return (
    <div className="flex w-full items-center justify-center p-5">
      <Tooltip text="Delete card">
        <button
          className="group relative flex items-center justify-center rounded-full bg-white p-3 transition-all ease-linear hover:bg-[#748297]"
          onClick={onDeleteNote}
        >
          <TrashIcon className="group-hover:fill-white" />
        </button>
      </Tooltip>
    </div>
  );
};
