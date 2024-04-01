"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const ScrolledSearchNote = () => {
  const [searchValue, setsSearchValue] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const router = useRouter();
  const search = useSearchParams().get("search");

  function onChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setHasTyped(true);
    setsSearchValue(e.target.value);
  }

  useEffect(() => {
    setsSearchValue(search || "");
  }, [search]);

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
    <div className="relative mt-8 rounded-lg bg-white p-2 lg:p-4">
      <input
        type="text"
        onChange={onChangeSearch}
        placeholder="Search my mind..."
        className="focus-none w-full  bg-transparent text-lg italic outline-none placeholder:opacity-70 hover:placeholder:opacity-50 lg:font-louize lg:text-3xl"
        value={searchValue}
      />
    </div>
  );
};
