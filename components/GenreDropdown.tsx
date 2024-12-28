import { ChevronDown } from "lucide-react";
import { getTranslations } from "next-intl/server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/src/i18n/routing";
import { Genres } from "@/types";

async function GenreDropdown() {
  const t = await getTranslations("common");

  // TODO: move out from component
  const url = "https://api.themoviedb.org/3/genre/movie/list";
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json;",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  };

  const response = await fetch(url, options);
  const data = (await response.json()) as Genres;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white flex justify-center items-center">
        {t("genre")}
        <ChevronDown className="ml-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("selectGenre")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data.genres.map((genre) => (
          <DropdownMenuItem key={genre.id}>
            <Link href={`/genre/${genre.id}?genre=${genre.name}`}>
              {genre.name}
            </Link>
          </DropdownMenuItem>
        ))}
        /
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default GenreDropdown;
