import { getDbOnClient } from "@/database/client";
import { getDbOnServer } from "@/database/server";

export const getUser = async () => {
  if (typeof window === "undefined") {
    const supabase = await getDbOnServer();
    const { data } = await supabase.auth.getUser();
    const { user } = data;
    return user;
  }

  const supabase = getDbOnClient();
  const { data } = await supabase.auth.getUser();
  const { user } = data;
  return user;
};
