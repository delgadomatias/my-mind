import { useEffect } from "react";

interface Props {
  callback: Function;
  key: string;
}

export const useKey = ({ key, callback }: Props) => {
  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === key) {
        callback(e);
      }
    };

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [callback, key]);
};
