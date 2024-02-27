"use client";

import { useKey } from "@/app/hooks";
import { useRouter } from "next/navigation";

interface Props {
  onUpdateNote: () => void;
}

export const BackdropShadow = ({ onUpdateNote }: Props) => {
  const router = useRouter();

  function handleBackdropClose() {
    router.back();
    onUpdateNote();
  }

  useKey({ key: "Escape", callback: handleBackdropClose });

  return (
    <div
      className="fixed h-screen w-full inset-0 bg-black/80 hover:bg-black/70 transition-all duration-100 ease-linear"
      id="backdrop-shadow"
    >
      <button className="w-full h-full relative" onClick={handleBackdropClose}>
        <p
          className="text-white opacity-60 absolute w-full text-center pt-5 top-0 hidden transition-all duration-100 ease-linear  cursor-pointer"
          id="backdrop-button-close"
        >
          ESC to close card
        </p>
      </button>
    </div>
  );
};
