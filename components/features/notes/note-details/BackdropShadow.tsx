"use client";

import { useKey } from "@/hooks";
import { useRouter } from "next/navigation";

interface Props {
  onUpdateNote: () => void;
  closeOnEscape?: boolean;
}

export const BackdropShadow = ({
  onUpdateNote,
  closeOnEscape = false,
}: Props) => {
  const router = useRouter();

  function handleBackdropClose() {
    if (!closeOnEscape) return;
    window.location.hash = "";
    onUpdateNote();
  }

  useKey({ key: "Escape", callback: handleBackdropClose });

  return (
    <div
      className="fixed inset-0  z-50 hidden h-screen w-full bg-black/80 transition-all duration-100 ease-linear hover:bg-black/70 lg:block"
      id="backdrop-shadow"
    >
      <button
        className="relative h-screen w-full"
        onClick={handleBackdropClose}
      >
        <p
          className="absolute top-0 hidden w-full cursor-pointer pt-5 text-center text-white opacity-60 transition-all duration-100 ease-linear"
          id="backdrop-button-close"
        >
          ESC to close card
        </p>
      </button>
    </div>
  );
};
