/**
 * Checks if an image tag is present in the given content.
 *
 * @param content - The content to check for an image tag.
 * @returns A boolean indicating whether an image tag is present in the content.
 */
export const isImageInContent = (content: string) => {
  return Boolean(content.match(/^\s*<img\s+src=(["']?)[^"']*?\1\s*\/>\s*$/g));
};
