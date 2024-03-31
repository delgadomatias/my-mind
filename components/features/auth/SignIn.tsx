"use client";

import { AuthActions } from "@/actions";
import { SubmitAuthButton } from "@/components/features/auth/SubmitAuthButton";
import { useAuthError } from "@/hooks/useAuthError";
import { useFormState } from "react-dom";

const initialState = {
  error: "",
};

export const SignIn = () => {
  const [state, formAction] = useFormState(
    AuthActions.signInWithEmailAndPassword,
    initialState,
  );
  const { hasError } = useAuthError(state);

  return (
    <form className="mt-5 flex w-full flex-col gap-4" action={formAction}>
      {hasError && (
        <p className=" rounded-xl bg-red-500 p-4 text-lg font-bold text-white">
          {state.error}
        </p>
      )}
      <input
        type="text"
        name="email"
        placeholder="Your email"
        className="focus-none w-full rounded-xl bg-transparent bg-white p-4 text-xl shadow-xl outline-none"
      />

      <input
        type="password"
        name="password"
        placeholder="Your password"
        className="focus-none w-full rounded-xl bg-transparent bg-white p-4 text-xl shadow-xl outline-none"
      />
      <SubmitAuthButton text="Sign in" />
    </form>
  );
};
