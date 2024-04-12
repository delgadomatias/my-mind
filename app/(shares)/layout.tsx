import { PropsWithChildren } from "react";

const SharesLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className="before:absolute before:left-0 before:top-[-80px] before:h-[250px] before:w-full before:bg-[url('https://static.accelerator.net/134/0.28.7/shares/images/top-gradient.png')] before:bg-cover before:bg-center before:bg-no-repeat before:content-[''] md:before:h-[350px]"></header>
      <main>{children}</main>
    </>
  );
};

export default SharesLayout;
