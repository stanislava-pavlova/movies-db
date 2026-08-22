import Image from "next/image";
import { getLocale } from "next-intl/server";

import { auth } from "@/src/auth";
import UserAccount from "@/src/components/auth/UserAccount";
import { Link } from "@/src/i18n/routing";
import { getGenres } from "@/src/lib/getMovies";

import ClientHeaderWrapper from "./ClientHeaderWrapper";
import DrawerMenu from "../DrawerMenu";
import { GenreDropdown } from "../GenreDropdown";
import LanguageSelector from "../LanguageSelector";
import SearchInput from "../SearchInput";

export default async function Header() {
  const genres = await getGenres();
  const locale = await getLocale();
  const session = await auth();

  return (
    <ClientHeaderWrapper>
      <div className="w-full max-w-screen-2xl mx-auto flex justify-between items-center px-5 md:px-10">
        <Link href="/" className="mr-10">
          <Image
            src="/logo.png"
            alt="Logo"
            width={180}
            height={30}
            loading="eager"
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:space-x-2">
          <LanguageSelector locale={locale} />
          <GenreDropdown genres={genres} />
          <SearchInput />
          <UserAccount user={session?.user} />
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden flex items-center gap-2">
          <UserAccount user={session?.user} />
          <DrawerMenu genres={genres} locale={locale} />
        </div>
      </div>
    </ClientHeaderWrapper>
  );
}
