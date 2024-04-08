import {
  createRouteHandlerClient,
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getDbOnServerComponent = async () => {
  return createServerComponentClient({
    cookies,
  });
};

export const getDbOnServerActions = async () => {
  return createServerActionClient({
    cookies,
  });
};

export const getDbOnRouteHandler = async () => {
  return createRouteHandlerClient({
    cookies,
  });
};
