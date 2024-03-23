import { TrashIcon } from "@/app/components/shared/icons/TrashIcon";

interface Props {
  onDeleteNote: () => void;
}

export const CardActions = ({ onDeleteNote }: Props) => {
  return (
    <div className="flex w-full items-center justify-center p-5">
      <button
        className="group rounded-full bg-white p-3 transition-all ease-linear hover:bg-[#748297]"
        onClick={onDeleteNote}
        title="Delete card"
      >
        <TrashIcon className="group-hover:fill-white" />
      </button>
    </div>
  );
};
