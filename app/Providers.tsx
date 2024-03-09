"use client";

import { NextUIProvider } from "@nextui-org/react";
import { NoteProvider } from "./context/notes/NoteProvider";
import { ImageUploadProvider } from "@/context/image-upload/ImageUploadProvider";
import React from "react";

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <NextUIProvider>
      <NoteProvider>
        <ImageUploadProvider>{children}</ImageUploadProvider>
      </NoteProvider>
    </NextUIProvider>
  );
};
