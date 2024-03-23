import { TrashIcon } from "@/app/components/shared/icons/TrashIcon";

interface Props {
  onDeleteNote: () => void;
}

export const CardActions = ({ onDeleteNote }: Props) => {
  return (
    <div className="flex items-center justify-center w-full p-5">
      <button
        className="p-3 bg-white rounded-full hover:bg-[#748297] group transition-all ease-linear"
        onClick={onDeleteNote}
        title="Delete card"
      >
        <TrashIcon className="group-hover:fill-white" />
      </button>
    </div>
  );
};
