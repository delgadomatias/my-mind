"use client";

import { AuthActions } from "@/actions";
import { SignUpSchema } from "@/validations/auth/ZodSchemas";
import { SignUpFormData } from "@/validations/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormField } from "./FormField";
import { SubmitAuthButton } from "./SubmitAuthButton";

export const SignUp = () => {
  // Custom hook to handle form state and actions (server side).
  const [state, formAction] = useFormState(
    AuthActions.signUpWithEmailAndPassword,
    {
      error: "",
    },
  );

  // Register form fields and validate them with zod (client side).
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    // Needs to be FormData to be sent to the server action.
    const formData = new FormData();
    formData.append("name", data.name);
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
      {/* Error on server side */}
      {state?.error && (
        <p className=" rounded-lg bg-red-500 p-4 text-base font-bold text-white">
          {state.error}
        </p>
      )}

      {/* Show two FormField inline */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-5 flex flex-col gap-1">
          <FormField
            error={!!errors.name}
            errorMessage={errors.name?.message}
            placeholder="Name"
            register={register}
            type="text"
            name="name"
          />
        </div>
        <div className="col-span-7 flex flex-col gap-1">
          <FormField
            error={!!errors.email}
            errorMessage={errors.email?.message}
            placeholder="Email"
            register={register}
            type="text"
            name="email"
          />
        </div>
      </div>

      {/* Another FormField below */}
      <div className="col-span-7 flex flex-col gap-1">
        <FormField
          error={!!errors.password}
          errorMessage={errors.password?.message}
          placeholder="Password"
          register={register}
          type="password"
          name="password"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-4 w-full">
        <SubmitAuthButton text="Sign up" isSubmitting={isSubmitting} />
      </div>
    </form>
  );
};
