import { getTranslations } from "next-intl/server";

import AISuggestions from "@/components/AISuggestions";
import MoviesCarousel from "@/components/MoviesCarousel";
import { getDiscoverMovies } from "@/lib/getMovies";

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
    <div className="max-w-7xl mx-auto px-5 md:px-10">
      <div className="flex flex-col space-y-5 mt-20 md:mt-28">
        <h1 className="text-4xl md:text-6xl font-bold">
          {t("resultsFor")} {genre}
        </h1>

        <AISuggestions term={genre} />

        <MoviesCarousel title={`Genre`} movies={movies} isVertical />
      </div>
    </div>
  );
}

export default GenrePage;
