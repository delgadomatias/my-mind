import Link from "next/link";

const SettingsPage = () => {
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
        <p className="text-xl leading-[24px] text-[#748297] duration-150 ease-linear group-hover:text-[#ff5924]">
          back to my mind
        </p>
      </Link>

      <div className="mx-auto flex min-h-[calc(100vh_-_5rem)] max-w-screen-lg items-center  px-6 pt-20">
        <h1 className="font-louize text-6xl tracking-[-0.05em]">
          You have a beautiful mind
        </h1>
      </div>
    </section>
  );
};

export default SettingsPage;
