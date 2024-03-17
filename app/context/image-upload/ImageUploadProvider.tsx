import { checkValidFiles } from "@/app/utils/checkValidFiles";
import { uploadFiles } from "@/components/features/drag-and-drop/uploadFiles";
import { imageUploadReducer } from "@/context/image-upload/imageUploadReducer";
import { useNoteContext } from "@/context/notes";
import { ImageUploadState } from "@/interfaces/image-upload-context.interface";
import React, { useEffect, useReducer } from "react";
import { ImageUploadContext } from "./ImageUploadContext";

interface Props {
  children: React.ReactNode;
}

export const IMAGE_UPLOAD_INITIAL_STATE: ImageUploadState = {
  isDragOver: false,
  isUploading: false,
  files: [],
  isError: false,
};

export const ImageUploadProvider = ({ children }: Props) => {
  const { addNote } = useNoteContext();
  const [state, dispatch] = useReducer(
    imageUploadReducer,
    IMAGE_UPLOAD_INITIAL_STATE
  );

  function setDragOver(payload: boolean) {
    dispatch({ type: "imageUpload/set_dragOver", payload });
  }

  function setFiles(payload: File[]) {
    dispatch({ type: "imageUpload/set_files", payload });
  }

  function setIsUploading(payload: boolean) {
    dispatch({ type: "imageUpload/set_isUploading", payload });
  }

  function setIsError(payload: boolean) {
    dispatch({ type: "imageUpload/set_isError", payload });
  }

  useEffect(() => {
    const body = document.body;
    body.addEventListener("dragover", handleDragOver);

    function handleDragOver(e: DragEvent) {
      e.preventDefault();
      setDragOver(true);
    }

    return () => {
      body.removeEventListener("dragover", handleDragOver);
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    body.addEventListener("drop", handleDrop);

    async function handleDrop(event: DragEvent) {
      if (!event.dataTransfer) return;
      event.preventDefault();

      // Update the state
      setDragOver(false);
      setIsUploading(true);

      // Get the files and update the state
      const { files } = event.dataTransfer;
      const arrayFiles = Array.from(files);

      // Check type files
      const isValidFiles = checkValidFiles(arrayFiles);
      if (!isValidFiles) {
        setIsError(true);
        setIsUploading(false);

        setTimeout(() => {
          setIsError(false);
        }, 2000);

        return;
      }

      setFiles(arrayFiles);
      await uploadFiles({ files: arrayFiles });
      setIsUploading(false);
    }

    return () => {
      body.removeEventListener("drop", handleDrop);
    };
  }, [addNote]);

  useEffect(() => {
    const dragShadow = document.querySelector(".drag-shadow") as HTMLDivElement;
    if (!dragShadow) return;

    dragShadow.addEventListener("dragleave", handleDragLeave);
    function handleDragLeave(e: DragEvent) {
      e.preventDefault();
      setDragOver(false);
    }

    return () => {
      dragShadow.removeEventListener("dragleave", handleDragLeave);
    };
  }, [state.isDragOver]);

  return (
    <ImageUploadContext.Provider
      value={{
        setDragOver,
        setFiles,
        setIsError,
        setIsUploading,
        ...state,
      }}
    >
      {children}
    </ImageUploadContext.Provider>
  );
};
