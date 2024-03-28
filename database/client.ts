import { createBrowserClient } from "@supabase/ssr";

export const getDbOnClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
  );
};
