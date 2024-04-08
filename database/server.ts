import {
  createRouteHandlerClient,
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getDbOnServerComponent = async () => {
  return createServerComponentClient(
    {
      cookies,
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
    },
  );
};

export const getDbOnServerActions = async () => {
  return createServerActionClient(
    {
      cookies,
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
    },
  );
};

export const getDbOnRouteHandler = async () => {
  return createRouteHandlerClient(
    {
      cookies,
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
    },
  );
};
