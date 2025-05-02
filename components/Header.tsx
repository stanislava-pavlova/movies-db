import Image from "next/image";

import { Link } from "@/src/i18n/routing";

import DrawerMenu from "./DrawerMenu";
import GenreDropdown from "./GenreDropdown";
import LanguageSelector from "./LanguageSelector";
import SearchInput from "./SearchInput";
// import { ThemeToggler } from "./ThemeToggler";

function Header() {
  return (
    <header className="fixed w-full z-[70] top-0 py-5 bg-gradient-to-t from-gray-200/0 via-gray-900/25 to-gray-900">
      <div className="w-full max-w-screen-2xl mx-auto flex justify-between items-center px-5 md:px-10">
        <Link href="/" className="mr-10">
          <Image
            src="/logo.png"
            alt="Logo"
            width={180}
            height={30}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:space-x-2">
          <LanguageSelector />
          <GenreDropdown />
          <SearchInput />
          {/* <ThemeToggler /> */}
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden">
          <DrawerMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
