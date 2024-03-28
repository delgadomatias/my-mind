import { ImageUploadState } from "@/interfaces/image-upload-context.interface";

type ImageUploadActions =
  | {
      type: "imageUpload/set_dragOver";
      payload: boolean;
    }
  | {
      type: "imageUpload/set_files";
      payload: File[];
    }
  | {
      type: "imageUpload/set_isUploading";
      payload: boolean;
    }
  | {
      type: "imageUpload/set_isError";
      payload: boolean;
    };

interface Reducer {
  (state: ImageUploadState, action: ImageUploadActions): ImageUploadState;
}

export const imageUploadReducer: Reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case "imageUpload/set_dragOver": {
      return {
        ...state,
        isDragOver: action.payload,
      };
    }
    case "imageUpload/set_files": {
      return {
        ...state,
        files: action.payload,
      };
    }
    case "imageUpload/set_isUploading": {
      return {
        ...state,
        isUploading: action.payload,
      };
    }
    case "imageUpload/set_isError": {
      return {
        ...state,
        isError: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
