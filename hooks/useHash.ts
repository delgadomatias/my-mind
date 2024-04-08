import { useEffect, useState } from "react";

/**
 * Custom hook that extracts the hash and query parameters from the current URL.
 * @returns An object containing the hash and query parameters.
 */
export const useHash = () => {
  const [hash, setHash] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState<any>({});

  useEffect(() => {
    function handleHashChange() {
      const hashLocationSplit = window.location.hash.split(/[?&]/);
      const currentHash = hashLocationSplit[0].slice(1);
      setHash(currentHash);

      hashLocationSplit.slice(1).map((queryParam) => {
        const [key, value] = queryParam.split("=");
        setQueryParams((prev: any) => ({ ...prev, [key]: value }));
      });
    }

    handleHashChange();
    window.addEventListener("popstate", handleHashChange);

    return () => {
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  return {
    hash,
    queryParams,
  };
};
