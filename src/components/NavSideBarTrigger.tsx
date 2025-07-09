"use client";

import { Menu } from "lucide-react";
import SearchBar from "./SearchBar";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

export const NavSideBarTrigger = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <span className="inline-flex tablet:hidden">
      <SearchBar />
      <Button
        onClick={toggleSidebar}
        className="!p-2 !py-1.5 h-fit w-fit rounded-full"
      >
        <Menu className="size-6" />
      </Button>
    </span>
  );
};

export default NavSideBarTrigger;
