export const isExpiredDate = (date: Date) => {
  return date < new Date();
};
