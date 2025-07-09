import { Search } from "lucide-react";
import { inter } from "../../public/font";
import ThemeToggle from "./ThemeToggle";

export const NavBar = () => {
  return (
    <header className="flex items-center justify-center p-4">
      <nav className="flex items-center justify-between w-full">
        <a
          href="/"
          className={`${inter.className} text-[18px]`}
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
