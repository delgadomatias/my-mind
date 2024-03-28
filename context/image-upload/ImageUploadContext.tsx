import { createContext } from "react";
import { IImageUploadContext } from "@/interfaces/image-upload-context.interface";

export const ImageUploadContext = createContext({} as IImageUploadContext);
