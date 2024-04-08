import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const getDbOnClient = () => {
  return createClientComponentClient();
};
