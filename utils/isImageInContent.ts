export const isImageInContent = (content: string) => {
  return Boolean(content.match(/^\s*<img\s+src=(["']?)[^"']*?\1\s*\/>\s*$/g));
};
