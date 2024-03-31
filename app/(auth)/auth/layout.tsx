import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth | My Mind",
  description: "My Mind application for personal knowledge management",
};

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <main>
      <section className="relative flex min-h-screen w-full items-center justify-center bg-white xl:px-20">
        <div className="relative grid h-full min-h-screen w-full grid-cols-12 xl:p-8 2xl:p-16 ">
          <div className="absolute left-0 top-0 hidden h-full w-full p-8 xl:block 2xl:p-16">
            <video
              src="https://carbon-media.accelerator.net/00000000001/eXr1zMClpJ3bKSpe5wwxuT;2880x_.mp4"
              muted
              loop
              autoPlay
              className="z-0 h-full max-h-full w-full object-cover"
            ></video>
          </div>
          <div className="hidden xl:col-span-6 xl:block"></div>
          <div className="z-50 order-2 col-span-12 flex h-full items-center justify-center  bg-[#F0F2F5] xl:col-span-6">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
