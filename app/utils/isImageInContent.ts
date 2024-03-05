export const isImageInContent = (content: string) => {
  return Boolean(content.match(/<img[^>]*>/g));
};
