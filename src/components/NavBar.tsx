import { Search } from "lucide-react";
import { inter } from "../../public/font";
import ThemeToggle from "./ThemeToggle";

export const NavBar = () => {
  return (
    <header className="flex items-center justify-center p-6 py-6 pt-8 w-full tablet:py-8 laptop:py-12">
      <nav className="flex items-center justify-between max-w-[1280px] w-full">
        <a
          href="/"
          className={`${inter.className} text-[18px] tablet:text-[20px] font-bold`}
        >
          Liam Kyle's
        </a>

        <div className="flex items-center justify-center gap-3">
          <Search />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
