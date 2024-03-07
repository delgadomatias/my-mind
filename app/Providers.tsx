"use client";

import { NextUIProvider } from "@nextui-org/react";
import { NoteProvider } from "./context/notes/NoteProvider";

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <NextUIProvider>
      <NoteProvider>{children}</NoteProvider>;
    </NextUIProvider>
  );
};
