import { getUser } from "./getUser";

// Only CALL in SERVER SIDE
export const isAuthenticated = async () => {
  if (typeof window !== "undefined") {
    throw new Error("This function should be called on the server side");
  }

  const user = await getUser();
  return user ? true : false;
};
