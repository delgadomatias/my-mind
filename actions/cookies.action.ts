"use server";

import { cookies } from "next/headers";

export async function setCookie(name: string, value: string) {
  const store = cookies();
  store.set(name, value);
}

export async function deleteCookie(name: string) {
  const store = cookies();
  store.delete(name);
}
