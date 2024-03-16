import { cookies } from "next/headers";

export const getCookiesOnServerSide = () => {
  const cookiesStore = cookies();

  function getAllCookies() {
    return cookiesStore.getAll();
  }

  return {
    getAllCookies,
  };
};
