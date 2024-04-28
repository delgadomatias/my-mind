"use server";

import { getDbOnServerActions } from "@/database/server";
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignInSchema,
  SignUpSchema,
} from "@/validations/auth/ZodSchemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CookiesActions } from ".";

/**
 * Signs up a user with the provided email and password.
 *
 * @param form - The form data containing the user's name, email, and password.
 * @returns An object with the error message if an error occurs during sign up.
 */
export async function signUpWithEmailAndPassword(
  prevState: any,
  form: FormData,
) {
  // Parse the form data to extract the user's name, email, and password.
  const signUpForm = {
    name: form.get("name") as string,
    email: form.get("email") as string,
    password: form.get("password") as string,
  };

  const formParsed = SignUpSchema.safeParse(signUpForm);
  if (!formParsed.success) {
    return {
      error: "Something went wrong",
    };
  }

  const supabase = await getDbOnServerActions();
  const { data: signedUpUser, error: signUpError } = await supabase.auth.signUp(
    {
      email: signUpForm.email,
      password: signUpForm.password,
    },
  );

  if (signUpError) {
    return {
      error: signUpError.message,
    };
  }

  // At this point: the user has been successfully signed up.
  // But, we need to update the user's name in the public schema.
  const { error: updateNameError } = await supabase
    .from("User")
    .update({ name: signUpForm.name })
    .eq("id", signedUpUser?.user?.id);

  if (updateNameError) {
    return {
      error: "Something went wrong.",
    };
  }

  redirect("/");
}

export async function signInWithEmailAndPassword(
  prevState: any,
  form: FormData,
) {
  const signInForm = {
    email: form.get("email") as string,
    password: form.get("password") as string,
  };

  const formParsed = SignInSchema.safeParse(signInForm);
  if (!formParsed.success) {
    return {
      error: "Something went wrong",
    };
  }

  const supabase = await getDbOnServerActions();
  const { error } = await supabase.auth.signInWithPassword({
    email: signInForm.email,
    password: signInForm.password,
  });

  const cookieStore = cookies();
  const next = cookieStore.get("next")?.value || "/";
  await CookiesActions.deleteCookie("next");

  if (error) {
    return {
      error: error.message,
    };
  }

  redirect(next);
}

export async function forgotPassword(prevState: any, form: FormData) {
  const forgotPasswordForm = {
    email: form.get("email") as string,
  };

  const formParsed = ForgotPasswordSchema.safeParse(forgotPasswordForm);
  if (!formParsed.success) {
    return {
      error: "Something went wrong",
    };
  }

  const supabase = await getDbOnServerActions();
  const cookieStore = cookies();
  cookieStore.set("next", "/auth/reset-password");
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    forgotPasswordForm.email,
    {
      redirectTo: "http://localhost:3000/api/auth/callback",
    },
  );

  if (error) {
    return {
      error: error.message,
    };
  }

  redirect("/auth/signin");
}

export async function resetPassword(prevState: any, form: FormData) {
  const resetPasswordForm = {
    password: form.get("password") as string,
  };

  const formParsed = ResetPasswordSchema.safeParse(resetPasswordForm);
  if (!formParsed.success) {
    return {
      error: "Something went wrong",
    };
  }

  const supabase = await getDbOnServerActions();
  const { data, error } = await supabase.auth.updateUser({
    password: resetPasswordForm.password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  await supabase.auth.signOut();
  redirect("/auth/signin");
}
