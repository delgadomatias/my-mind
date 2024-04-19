"use client";

import { useFormStatus } from "react-dom";

interface Props {
  text: string;
}

export const SubmitAuthButton = ({ text }: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`rounded-xl bg-[#301934] p-4 text-xl text-white ${pending ? "animate-pulse" : ""}`}
      disabled={pending}
      type="submit"
    >
      {text}
    </button>
  );
};
