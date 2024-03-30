import React, { ReactElement } from "react";

interface Props {
  children: ReactElement;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
}

export const Tooltip = ({ children, text, position = "top" }: Props) => {
  const positionClass = {
    top: "-top-[calc(100%_+_0.1rem)]",
    bottom: "-bottom-[calc(100%_+_0.1rem)]",
    right: "left-[calc(100%_+_0.3rem)]",
    left: "right-[calc(100%_+_0.3rem)]",
  };

  const childrenWithDeleteCard = React.cloneElement(
    children,
    {},
    <>
      {children.props.children}
      <span
        className={`pointer-events-none absolute w-full min-w-max rounded-lg bg-white px-4 py-2 text-center text-sm opacity-0 shadow-xl transition-opacity duration-75 ease-linear group-hover:opacity-100 ${positionClass[position]}`}
      >
        {text}
      </span>
    </>,
  );

  return (
    <div className="relative flex h-full items-center justify-center">
      {childrenWithDeleteCard}
    </div>
  );
};
