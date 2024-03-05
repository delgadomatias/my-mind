export const useLocalStorage = () => {
  const isValidWindow = () => {
    return typeof window !== "undefined";
  };

  const setItem = (key: string, value: string) => {
    if (!isValidWindow()) return;

    localStorage.setItem(key, value);
  };

  const getItem = (key: string) => {
    if (!isValidWindow()) return;

    return localStorage.getItem(key);
  };

  return { setItem, getItem };
};
