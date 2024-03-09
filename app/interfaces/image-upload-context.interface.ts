export interface IImageUploadContext {
  isDragOver: boolean;
  isUploading: boolean;
  files: File[];

  setDragOver(payload: boolean): void;
  setIsUploading(payload: boolean): void;
  setFiles(payload: File[]): void;
}

export interface ImageUploadState {
  isDragOver: boolean;
  isUploading: boolean;
  files: File[];
}
