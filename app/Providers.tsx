"use client";

import { NoteProvider } from "./context/notes/NoteProvider";

export const Providers = ({ children }: React.PropsWithChildren) => {
  return <NoteProvider>{children}</NoteProvider>;
};
