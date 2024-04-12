"use server";

import { getDbOnServerActions } from "@/database/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CookiesActions } from ".";

export async function signUpWithEmailAndPassword(
  prevState: any,
  form: FormData,
) {
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const supabase = await getDbOnServerActions();
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  redirect("/");
}

export async function signInWithEmailAndPassword(
  prevState: any,
  form: FormData,
) {
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const supabase = await getDbOnServerActions();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
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
