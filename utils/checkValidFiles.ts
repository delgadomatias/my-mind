import { VALID_FILE_TYPES } from "./constants";

export const checkValidFiles = (files: File[]) => {
  return files.some((file) => VALID_FILE_TYPES.includes(file.type));
};
