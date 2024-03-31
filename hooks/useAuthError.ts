import { AuthError } from "@/interfaces/auth-error.interface";
import { useEffect, useState } from "react";

export const useAuthError = ({ error }: AuthError) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (error.length > 0) {
      return setHasError(true);
    }

    setHasError(false);
  }, [error]);

  useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        setHasError(false);
      }, 5000);
    }
  }, [hasError]);

  return {
    hasError,
  };
};
