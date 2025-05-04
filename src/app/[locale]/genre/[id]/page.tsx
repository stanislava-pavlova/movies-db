import { getTranslations } from "next-intl/server";

import AISuggestions from "@/src/components/AISuggestions";
import MoviesCarousel from "@/src/components/MoviesCarousel";
import { SortDropdown } from "@/src/components/SortDropdown";
import { getDiscoverMovies } from "@/src/lib/getMovies";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    genre: string;
  };
};

async function GenrePage({ params: { id }, searchParams: { genre } }: Props) {
  const movies = await getDiscoverMovies(id);

  const t = await getTranslations("common");

  return (
    <div className="max-w-screen-2xl mx-auto px-5 md:px-10">
      <div className="flex flex-col space-y-5 mt-20 md:mt-28">
        <h1 className="text-4xl md:text-6xl font-bold">
          {t("resultsFor")} {genre}
        </h1>

        <AISuggestions term={genre} />

        <div className="flex justify-between items-center !mb-6">
          <h2 className="text-3xl font-semibold py-2">{t("movies")}</h2>
          <SortDropdown genre={genre} id={id} />
        </div>

        <MoviesCarousel movies={movies} isVertical />
      </div>
    </div>
  );
}

export default GenrePage;
