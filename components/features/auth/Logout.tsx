"use client";

import { Auth } from "@/database/auth";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const router = useRouter();

  async function onLogout() {
    await Auth.logout();
    router.push("/auth/signin");
  }

  return (
    <div className="flex justify-end">
      <button
        className="cursor-pointer text-xl tracking-[-0.02em] text-[#30435F] duration-150 ease-linear hover:text-[#ff5924]"
        onClick={onLogout}
      >
        → Sign out of my mind
      </button>
    </div>
  );
};
