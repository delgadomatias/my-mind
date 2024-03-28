import { getDbOnClient } from "@/database/client";
import { getDbOnServerComponent } from "@/database/server";

export const getUser = async () => {
  if (typeof window === "undefined") {
    const supabase = await getDbOnServerComponent();
    const { data } = await supabase.auth.getSession();
    const { session } = data;
    return session?.user;
  }

  const supabase = getDbOnClient();
  const { data } = await supabase.auth.getUser();
  const { user } = data;
  return user;
};
