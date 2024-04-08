import { useEffect } from "react";

interface Props {
  callback: Function;
  key: string;
}

/**
 * Custom hook that listens for a specific key press and invokes a callback function when the key is pressed.
 *
 * @param {Object} props - The hook props.
 * @param {string} props.key - The key to listen for.
 * @param {Function} props.callback - The callback function to invoke when the key is pressed.
 */
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
