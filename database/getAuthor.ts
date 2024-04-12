import { getDbOnServerComponent } from "./server";

export async function getAuthor(userId: string) {
  const supabase = await getDbOnServerComponent();
  const { data, error } = await supabase.rpc("Auth.get_username", {
    user_id: userId,
  });

  if (error) {
    throw error;
  }

  return data;
}
