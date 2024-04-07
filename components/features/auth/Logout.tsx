"use client";

import { Auth } from "@/database/auth";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const router = useRouter();
  async function onLogout() {
    await Auth.logout();
    router.push("/auth/login");
  }

  return (
    <button onClick={() => onLogout()}>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="#748297"
        viewBox="0 0 256 256"
      >
        <path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40A8,8,0,0,0,168,88v32H104a8,8,0,0,0,0,16h64v32a8,8,0,0,0,13.66,5.66l40-40A8,8,0,0,0,221.66,122.34Z"></path>
      </svg> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-logout"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#748297"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
        <path d="M9 12h12l-3 -3" />
        <path d="M18 15l3 -3" />
      </svg>
    </button>
  );
};
