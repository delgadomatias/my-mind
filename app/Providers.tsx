"use client";

import { ImageUploadProvider } from "@/context/image-upload/ImageUploadProvider";
import { NoteProvider } from "@/context/notes/NoteProvider";
import { NextUIProvider } from "@nextui-org/react";
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
