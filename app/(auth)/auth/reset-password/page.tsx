import { ResetPassword } from "@/components/features/auth/forgot-password/ResetPassword";
import Link from "next/link";

const ResetPasswordPage = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-center font-louize text-6xl font-medium tracking-[-0.05em] text-black sm:text-7xl md:text-7xl">
        Reset Your <br /> Password
      </h1>

      <p>
        Type in a new secure password and press save to update your password.
      </p>
      <ResetPassword />

      <footer className="mt-4">
        <p className="font-medium text-[#301934] sm:text-lg">
          <span className="opacity-60">Already have an account? </span>
          <Link className="underline" href="/auth/signin">
            Sign in here.
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default ResetPasswordPage;
