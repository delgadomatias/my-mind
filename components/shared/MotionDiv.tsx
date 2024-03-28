"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface Props extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export const MotionDiv = ({ children, ...rest }: Props) => {
  return <motion.div {...rest}>{children}</motion.div>;
};
