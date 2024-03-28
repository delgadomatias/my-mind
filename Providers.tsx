"use client";

import { ImageUploadProvider } from "@/context/image-upload/ImageUploadProvider";
import { NextUIProvider } from "@nextui-org/system";
import React from "react";

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <NextUIProvider>
      <ImageUploadProvider>{children}</ImageUploadProvider>
    </NextUIProvider>
  );
};
