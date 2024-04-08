import { VALID_CLASSES_BY_TAG } from "./constants";

export const getClassesByTags = (tags: string | null) => {
  return tags
    ?.split(",")
    .filter((tag) => {
      return VALID_CLASSES_BY_TAG[tag] ?? false;
    })
    .join(" ");
};
