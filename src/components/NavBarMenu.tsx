import { inter } from "../../public/font";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";

export const NavBarMenu = () => {
  return (
    <div
      className={`${inter.className} tablet:flex hidden items-center justify-center gap-2 tablet:gap-3`}
    >
      <SearchBar />

      <Button asChild>
        <a
          href="/blogs"
          className="!py-1 text-[16px] tablet:text-[18px] !rounded-full"
        >
          Blogs
        </a>
      </Button>

      <Button asChild>
        <a
          href="https://liam-kyle.works"
          target="_blank"
          rel="noopener noreferrer"
          className="!py-1 text-[16px] tablet:text-[18px] !rounded-full"
        >
          Portfolio
        </a>
      </Button>

      <ThemeToggle />
    </div>
  );
};

export default NavBarMenu;
