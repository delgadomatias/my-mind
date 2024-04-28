import { Logout } from "@/components/features/auth/Logout";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { GithubIcon } from "@/components/shared/ui/icons/GithubIcon";
import { GoogleIcon } from "@/components/shared/ui/icons/GoogleIcon";
import { getUser } from "@/utils/getUser";
import Link from "next/link";

const SettingsPage = async () => {
  const user = await getUser();
  const nameToShow = `, ${user.name}`;
  const isLoggedWithProvider = user.provider !== "email";
  const provider = user.provider!;

  const MAP_PROVIDER: {
    [key: string]: JSX.Element;
  } = {
    github: <GithubIcon />,
    google: <GoogleIcon />,
  };

  return (
    <section className="relative min-h-screen w-full">
      <Link
        className="group absolute left-6 top-6 inline-flex select-none items-center gap-3"
        href="/"
      >
        <span className="rounded-full bg-white p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#748297"
            viewBox="0 0 256 256"
          >
            <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path>
          </svg>
        </span>
        <p className="text-xl leading-[24px] text-[#748297] duration-150 ease-linear group-hover:text-[#301934]">
          back to my mind
        </p>
      </Link>

      <MotionDiv
        className="mx-auto flex min-h-[calc(100vh_-_4rem)] max-w-screen-lg flex-col justify-center gap-4 px-6 pt-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4 font-louize text-5xl tracking-[-0.05em] sm:text-5xl md:text-6xl">
          You have a beautiful mind
          <span className="text-[#748297]">{nameToShow ? nameToShow : ""}</span>
        </h1>

        <div className="flex flex-col gap-2 rounded-md bg-white px-6 py-4">
          <h2 className="mb-2 border-b-1 border-[#DFE5EE] pb-2 text-2xl font-normal tracking-[-0.02em] text-[#30435F]">
            Email
          </h2>
          <div className="inline-flex items-center gap-2">
            {isLoggedWithProvider && <>{MAP_PROVIDER[provider]}</>}
            <p className="text-[#748297]">{user?.email}</p>
          </div>
        </div>

        {!isLoggedWithProvider && (
          <div className="rounded-md bg-white px-6 py-4">
            <h2 className="mb-2 border-b-1 border-[#DFE5EE] pb-2 text-2xl font-normal tracking-[-0.02em] text-[#30435F]">
              Change password
            </h2>
            <p className="text-[#748297]">{user?.email}</p>
          </div>
        )}
        <Logout />
      </MotionDiv>
    </section>
  );
};

export default SettingsPage;
