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
} from "@/components/ui/dropdown-menu";
import { getGenres } from "@/lib/getMovies";
import { Link } from "@/src/i18n/routing";

async function GenreDropdown() {
  const t = await getTranslations("common");

  const genres = await getGenres();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white flex justify-center items-center">
        {t("genre")} <ChevronDown className="ml-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("selectGenre")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {genres?.map((genre) => (
            <Link
              key={genre.id}
              href={`/genre/${genre.id}?genre=${genre.name}`}
            >
              <DropdownMenuItem className="cursor-pointer">
                {genre.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default GenreDropdown;
