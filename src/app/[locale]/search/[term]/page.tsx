import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { auth } from "@/src/auth";
import AISuggestions from "@/src/components/AISuggestions";
import MoviesCarousel from "@/src/components/MoviesCarousel";
import { getPopularMovies, getSearchMovies } from "@/src/lib/getMovies";
import { getWatchlistMovieIds } from "@/src/lib/watchlist";

type Props = {
  params: Promise<{
    term: string;
  }>;
};

async function SearchPage({ params }: Props) {
  const { term } = await params;

  if (!term) notFound();

  const t = await getTranslations("common");
  const termToUse = decodeURI(term);
  const session = await auth();

  const [movies, popularMovies, watchlistedIds] = await Promise.all([
    getSearchMovies(termToUse),
    getPopularMovies(),
    session?.user?.id ? getWatchlistMovieIds(session.user.id) : undefined,
  ]);

  return (
    <div className="max-w-screen-2xl mx-auto px-5 md:px-10">
      <div className="flex flex-col space-y-5 mt-20 md:mt-28">
        <h1 className="text-4xl md:text-6xl font-bold">
          {t("resultsFor")} {termToUse}
        </h1>

        <AISuggestions term={termToUse} />

        <MoviesCarousel
          title={t("movies")}
          movies={movies}
          isVertical
          watchlistedIds={watchlistedIds}
        />
        <MoviesCarousel
          title={t("mayAlsoLike")}
          movies={popularMovies}
          watchlistedIds={watchlistedIds}
        />
      </div>
    </div>
  );
}

export default SearchPage;
