export const getClassesByTags = (tags: string | null) => {
  const classesByTag: {
    [key: string]: string;
  } = {
    quote: "quote",
    code: "code",
  };

  return tags
    ?.split(",")
    .filter((tag) => {
      return classesByTag[tag] ?? false;
    })
    .join(" ");
};
