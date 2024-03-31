import { SignUp } from "@/components/features/auth/SignUp";
import Link from "next/link";

export const metadata = {
  title: "Sign Up | My Mind",
};

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-center font-louize text-7xl font-medium tracking-[-0.05em] text-black md:text-7xl">
        Create a new <br /> account
      </h1>

      <SignUp />

      <footer className="mt-12">
        <p className="text-2xl font-light">
          Already have an account?{" "}
          <Link className="text-[#ff5924] underline" href="/auth/signin">
            Sign in here.
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default SignUpPage;
