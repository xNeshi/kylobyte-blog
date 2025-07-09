import { inter } from "../../public/font";
import NavBarMenu from "./NavBarMenu";
import NavSideBarTrigger from "./NavSideBarTrigger";

export const NavBar = () => {
  return (
    <header className="flex items-center justify-center p-6 py-6 pt-8 w-full tablet:py-8 laptop:py-12">
      <nav className="flex items-center justify-between max-w-[1280px] w-full">
        <a
          href="/"
          className={`${inter.className} line-clamp-1 text-[18px] tablet:text-[20px] font-bold`}
        >
          Liam Kyle's
        </a>

        <NavBarMenu />
        <NavSideBarTrigger />
      </nav>
    </header>
  );
};

export default NavBar;
