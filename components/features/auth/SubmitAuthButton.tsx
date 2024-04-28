"use client";

import { BarLoader } from "@/components/shared/ui/loaders/BarLoader";

interface Props {
  text: string;
  isSubmitting: boolean;
}

export const SubmitAuthButton = ({ text, isSubmitting }: Props) => {
  return (
    <button
      className={`w-full rounded-lg bg-[#301934] p-3 text-lg text-white ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
      disabled={isSubmitting}
      type="submit"
    >
      {isSubmitting ? (
        <div className="flex w-full items-center justify-center">
          <BarLoader />
        </div>
      ) : (
        text
      )}
    </button>
  );
};
