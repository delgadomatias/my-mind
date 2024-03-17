import { getDbOnAction, getDbOnServer } from "../supabase";

async function supabaseOnActions() {
  return await getDbOnAction();
}

async function supabaseOnServer() {
  return await getDbOnServer();
}
