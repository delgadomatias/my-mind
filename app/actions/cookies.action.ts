"use server";

import { cookies } from "next/headers";

export async function insertCookieAction(name: string, value: string) {
  console.log("Agregando cookie", name, value);
  try {
    const cookiesStore = cookies();
    cookiesStore.set(name, value);
  } catch (error) {
    console.log(error);
  }
}
