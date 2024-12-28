import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import AISuggestions from "@/components/AISuggestions";
import MoviesCarousel from "@/components/MoviesCarousel";
import { getPopularMovies, getSearchMovies } from "@/lib/getMovies";

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
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-5 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">
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
