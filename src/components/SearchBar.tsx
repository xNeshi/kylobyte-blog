"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isLarge = window.innerWidth >= 1024;
      setIsLaptop(isLarge);
      setOpen(isLarge); // 👈 open only on laptop, close on mobile
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-row w-full z-50 justify-end items-center laptop:w-[350px]">
      <AnimatePresence>
        {open && (
          <motion.input
            key="search"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, width: `100%`, opacity: 1 }}
            exit={{ x: 0, width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            type="text"
            placeholder="Search..."
            className="w-0 p-1 px-5 border-1 rounded-full text-[15px] mr-2"
          />
        )}
      </AnimatePresence>

      {!isLaptop ? (
        <Button
          onClick={() => setOpen((prev) => !prev)}
          className="!p-2 !py-1.5 h-fit w-fit rounded-full"
        >
          {open ? <X className="size-6" /> : <Search className="size-6" />}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="!p-2 !px-3 !py-1.5 h-fit w-fit rounded-full"
        >
          <Search className="size-6" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
