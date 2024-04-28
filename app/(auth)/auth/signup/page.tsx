import { SignUp } from "@/components/features/auth/SignUp";
import Link from "next/link";

export const metadata = {
  title: "Sign Up | My Mind",
};

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-center font-louize text-6xl font-medium tracking-[-0.05em] text-black sm:text-7xl md:text-7xl">
        Create a new <br /> account
      </h1>

      <SignUp />

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

export default SignUpPage;
