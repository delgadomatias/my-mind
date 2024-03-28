import { getDbOnClient } from "@/database/client";

export const logout = async () => {
  const supabase = getDbOnClient();
  await supabase.auth.signOut();
};
