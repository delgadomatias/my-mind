import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import "server-only";
export const dynamic = "force-dynamic";

export const getDbOnAction = async () => {
  const cookieStore = cookies();
  return createServerActionClient(
    { cookies: () => cookieStore },
    {
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
    },
  );
};

export const getDbOnServer = async () => {
  const cookieStore = cookies();
  return createServerComponentClient(
    { cookies: () => cookieStore },
    {
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
    },
  );
};
