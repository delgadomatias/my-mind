import { MotionDiv } from "@/components/shared/MotionDiv";
import Link from "next/link";

export const ExpiredShare = () => {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-6 overflow-hidden">
      <MotionDiv
        className="flex flex-col items-center justify-center gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-center font-louize text-4xl font-normal tracking-[-0.02em] text-black md:text-5xl lg:text-6xl">
          This share link expired, <br />
          for a good reason.
        </h1>
        <Link
          className="cursor-pointer text-xl font-medium tracking-[-0.02em] text-[#30435F] duration-150 ease-linear hover:text-[#301934]"
          href="/"
        >
          → Go home
        </Link>
      </MotionDiv>
    </section>
  );
};
