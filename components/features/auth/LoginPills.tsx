"use client";

import { GoogleIcon } from "@/components/shared/ui/icons/GoogleIcon";
import { getDbOnClient } from "@/database/client";

export const LoginPills = () => {
  async function loginWithGoogle() {
    const supabase = getDbOnClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/api/auth/callback`,
      },
    });
  }

  return (
    <div className="mt-1 w-full">
      <button
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-white p-3 text-base shadow-xl"
        onClick={loginWithGoogle}
      >
        <GoogleIcon />
        <span className="opacity-60">Sign in with Google</span>
      </button>
    </div>
  );
};
