"use client";

import { AuthActions } from "@/actions";
import { SubmitAuthButton } from "@/components/features/auth/SubmitAuthButton";
import { SignInSchema } from "@/validations/auth/ZodSchemas";
import { SignInFormData } from "@/validations/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormField } from "./FormField";

const initialState = {
  error: "",
};

export const SignIn = () => {
  const [state, formAction] = useFormState(
    AuthActions.signInWithEmailAndPassword,
    initialState,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    setIsSubmitting(true);
    formAction(formData);
  };

  useEffect(() => {
    setIsSubmitting(false);
  }, [state]);

  return (
    <form
      action={formAction}
      className="mt-5 flex w-full max-w-sm flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {state.error && (
        <p className=" rounded-xl bg-red-500 p-4 text-base font-bold text-white">
          {state.error}
        </p>
      )}

      <FormField
        error={!!errors.email}
        errorMessage={errors.email?.message}
        name="email"
        placeholder="Email"
        register={register}
      />

      <div className="flex flex-col gap-2">
        <FormField
          error={!!errors.password}
          errorMessage={errors.password?.message}
          name="password"
          placeholder="Password"
          register={register}
          type="password"
        />
        <div className="flex items-end justify-end text-[#301934]  opacity-60">
          <Link href="/auth/forgot-password">Forgot Password?</Link>
        </div>
      </div>

      <div className="mt-4 w-full">
        <SubmitAuthButton text="Sign in" isSubmitting={isSubmitting} />
      </div>
    </form>
  );
};
