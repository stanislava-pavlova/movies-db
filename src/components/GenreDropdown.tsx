import { ReactNode } from "react";

import { ChevronDown } from "lucide-react";
import { getTranslations } from "next-intl/server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Link } from "@/src/i18n/routing";
import { Genre } from "@/types";

async function DropdownWrapper({
  title,
  menuLabel,
  buttonClassName,
  children,
}: {
  title: string;
  menuLabel?: string;
  buttonClassName?: string;
  children: ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`text-white flex justify-center items-center ${buttonClassName}`}
      >
        {title} <ChevronDown className="ml-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {menuLabel && (
          <>
            <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>{children}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownWrapper;

export const GenreDropdown = async ({ genres }: { genres: Genre[] }) => {
  const t = await getTranslations("common");

  return (
    <DropdownWrapper title={t("genre")} menuLabel={t("selectGenre")}>
      {genres?.map((genre) => (
        <Link
          key={genre.id}
          href={`/genre/${genre.id}?genre=${genre.name}`}
          prefetch={false} // prefetches on hover
        >
          <DropdownMenuItem className="cursor-pointer">
            {genre.name}
          </DropdownMenuItem>
        </Link>
      ))}
    </DropdownWrapper>
  );
};
