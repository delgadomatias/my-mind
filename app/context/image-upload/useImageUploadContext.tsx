import { useContext } from "react";
import { ImageUploadContext } from "@/context/image-upload/ImageUploadContext";

export const useImageUploadContext = () => {
  return useContext(ImageUploadContext);
};
