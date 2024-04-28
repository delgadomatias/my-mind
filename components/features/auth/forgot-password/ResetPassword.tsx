"use client";

import { AuthActions } from "@/actions";
import { ResetPasswordSchema } from "@/validations/auth/ZodSchemas";
import { ResetPasswordFormData } from "@/validations/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormField } from "../FormField";
import { SubmitAuthButton } from "../SubmitAuthButton";

export const ResetPassword = async () => {
  const [state, formAction] = useFormState(AuthActions.resetPassword, {
    error: "",
  });
  const params = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    // Needs to be FormData to be sent to the server action.
    const formData = new FormData();
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
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-2"
    >
      <FormField
        error={!!errors.password}
        errorMessage={errors.password?.message}
        name="password"
        type="password"
        register={register}
        placeholder="Password"
      />

      <div className="mt-4">
        <SubmitAuthButton
          text="Save New Password"
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};
