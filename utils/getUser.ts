import { getDbOnClient } from "@/database/client";
import { getDbOnServerComponent } from "@/database/server";
import { PublicUser } from "@/interfaces";

export const getUser = async () => {
  if (typeof window === "undefined") {
    const supabase = await getDbOnServerComponent();
    const { data } = await supabase.auth.getSession();
    const { session } = data;
    const { data: user } = await supabase
      .from("User")
      .select("*")
      .eq("email", session?.user.email)
      .single();

    return user as PublicUser;
  }

  const supabase = getDbOnClient();
  const { data } = await supabase.auth.getSession();
  const { session } = data;

  const { data: user } = await supabase
    .from("User")
    .select("*")
    .eq("email", session?.user.email)
    .single();

  return user as PublicUser;
};
