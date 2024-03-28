export interface IImageUploadContext {
  files: File[];
  isDragOver: boolean;
  isError: boolean;
  isUploading: boolean;

  setDragOver(payload: boolean): void;
  setFiles(payload: File[]): void;
  setIsError(payload: boolean): void;
  setIsUploading(payload: boolean): void;
}

export interface ImageUploadState {
  files: File[];
  isDragOver: boolean;
  isError: boolean;
  isUploading: boolean;
}
