import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import AISuggestions from "@/src/components/AISuggestions";
import MoviesCarousel from "@/src/components/MoviesCarousel";
import { getPopularMovies, getSearchMovies } from "@/src/lib/getMovies";

type Props = {
  params: {
    term: string;
  };
};

async function SearchPage({ params: { term } }: Props) {
  if (!term) notFound();

  const t = await getTranslations("common");
  const termToUse = decodeURI(term);

  const movies = await getSearchMovies(termToUse);
  const popularMovies = await getPopularMovies();

  return (
    <div className="max-w-screen-2xl mx-auto px-5 md:px-10">
      <div className="flex flex-col space-y-5 mt-20 md:mt-28">
        <h1 className="text-4xl md:text-6xl font-bold">
          {t("resultsFor")} {termToUse}
        </h1>

        <AISuggestions term={termToUse} />

        <MoviesCarousel title={t("movies")} movies={movies} isVertical />
        <MoviesCarousel title={t("mayAlsoLike")} movies={popularMovies} />
      </div>
    </div>
  );
}

export default SearchPage;
