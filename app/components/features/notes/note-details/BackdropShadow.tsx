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
      className="fixed inset-0 w-full h-screen transition-all duration-100 ease-linear bg-black/80 hover:bg-black/70"
      id="backdrop-shadow"
    >
      <button className="relative w-full h-full" onClick={handleBackdropClose}>
        <p
          className="absolute top-0 hidden w-full pt-5 text-center text-white transition-all duration-100 ease-linear cursor-pointer opacity-60"
          id="backdrop-button-close"
        >
          ESC to close card
        </p>
      </button>
    </div>
  );
};
