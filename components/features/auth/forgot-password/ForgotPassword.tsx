"use client";

import { AuthActions } from "@/actions";
import { ForgotPasswordSchema } from "@/validations/auth/ZodSchemas";
import { ForgotPasswordFormData } from "@/validations/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormField } from "../FormField";
import { SubmitAuthButton } from "../SubmitAuthButton";

export const ForgotPassword = () => {
  const [state, formAction] = useFormState(AuthActions.forgotPassword, {
    error: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    // Needs to be FormData to be sent to the server action.
    const formData = new FormData();
    formData.append("email", data.email);
    setIsSubmitting(true);
    formAction(formData);
  };

  useEffect(() => {
    setIsSubmitting(false);
  }, [state]);

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-2"
    >
      <FormField
        error={!!errors.email}
        errorMessage={errors.email?.message}
        name="email"
        register={register}
        placeholder="Email"
      />

      <div className="mt-4">
        <SubmitAuthButton text="Send Reset Email" isSubmitting={isSubmitting} />
      </div>
    </form>
  );
};
