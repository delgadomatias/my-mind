import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const getDbOnClient = () => {
  return createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
  });
};
