import { LoginPills } from "@/components/features/auth/LoginPills";
import { Image } from "@nextui-org/image";

export const metadata = {
  title: "Login | My Mind",
};

const LoginPage = () => {
  return (
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
          <div className="flex flex-col items-center gap-4">
            <Image
              src="https://static.accelerator.net/134/0.27.1/onboard/images/branding-icon.svg"
              alt="Branding icon of My Mind"
            />

            <h1 className="text-center font-louize text-7xl font-medium tracking-[-0.05em] text-black">
              Access <br />
              your mind
            </h1>

            <LoginPills />

            <footer className="mt-12">
              <p className="text-2xl text-[#748297]">My Mind</p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
