"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchNote = () => {
  const [searchValue, setsSearchValue] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const search = useSearchParams().get("search");

  function onChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setHasTyped(true);
    setsSearchValue(e.target.value);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchValue === "" && hasTyped) {
        return router.push("/");
      }

      if (searchValue !== "") {
        router.push(`/?search=${searchValue}`);
      }
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue, router, hasTyped]);

  return (
    <div className="relative mt-8">
      <input
        type="text"
        onChange={onChangeSearch}
        placeholder="Search my mind..."
        className="focus-none w-full bg-transparent font-louize text-7xl italic outline-none placeholder:opacity-70 hover:placeholder:opacity-50"
        defaultValue={search || ""}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <hr className="mb-6 mt-4 border-black/10" />
      <motion.div
        className="absolute bottom-0 h-[0.05rem] w-full bg-black/40"
        initial={{ width: 0 }}
        animate={{ width: isHovered && !searchValue ? "100%" : 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>
    </div>
  );
};
