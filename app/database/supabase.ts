import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import "server-only";
export const dynamic = "force-dynamic";

export const getDbOnAction = cache(async () => {
  const cookieStore = cookies();
  return createServerActionClient(
    { cookies: () => cookieStore },
    {
      supabaseKey: process.env.SUPABASE_API_KEY,
      supabaseUrl: process.env.SUPABASE_PROJECT_URL,
    }
  );
});

export const getDbOnServer = cache(async () => {
  const cookieStore = cookies();
  return createServerComponentClient(
    { cookies: () => cookieStore },
    {
      supabaseKey: process.env.SUPABASE_API_KEY,
      supabaseUrl: process.env.SUPABASE_PROJECT_URL,
    }
  );
});
