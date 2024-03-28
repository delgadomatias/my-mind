import {
  createRouteHandlerClient,
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getDbOnServerComponent = async () => {
  const cookieStore = cookies();

  return createServerComponentClient(
    {
      cookies: () => cookieStore,
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
    },
  );
};

export const getDbOnServerActions = async () => {
  const cookieStore = cookies();
  return createServerActionClient(
    {
      cookies: () => cookieStore,
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
    },
  );
};

export const getDbOnRouteHandler = async () => {
  const cookieStore = cookies();
  return createRouteHandlerClient(
    {
      cookies: () => cookieStore,
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
    },
  );
};
