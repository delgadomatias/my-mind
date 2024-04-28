import { ForgotPassword } from "@/components/features/auth/forgot-password/ForgotPassword";
import Link from "next/link";

export const metadata = {
  title: "Forgot Password | My Mind",
};

const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-center font-louize text-6xl font-medium tracking-[-0.05em] text-black sm:text-7xl md:text-7xl">
        Reset Your <br /> Password
      </h1>

      <p>
        Type in your email and we&apos;ll send you a link to reset your
        password.
      </p>

      <ForgotPassword />

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

export default ForgotPasswordPage;
