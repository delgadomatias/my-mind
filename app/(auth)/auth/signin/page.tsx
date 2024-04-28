import { LoginPills } from "@/components/features/auth/LoginPills";
import { SignIn } from "@/components/features/auth/SignIn";
import Link from "next/link";

export const metadata = {
  title: "Sign In | My Mind",
};

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-center font-louize text-6xl font-medium tracking-[-0.05em] text-black sm:text-7xl">
        Access your <br /> mind
      </h1>

      <SignIn />

      <div className="mt-2 grid w-full grid-cols-12 items-center">
        <div className="col-span-5 h-[0.05rem] w-full bg-black/20"></div>
        <div className="col-span-2 text-center">Or</div>
        <div className="col-span-5 h-[0.05rem] w-full bg-black/20"></div>
      </div>

      <LoginPills />

      <footer className="mt-4">
        <p className="font-medium text-[#301934] sm:text-lg">
          <span className="opacity-60">Don&apos;t have an account yet? </span>
          <Link className="underline" href="/auth/signup">
            Sign up here.
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default SignInPage;
