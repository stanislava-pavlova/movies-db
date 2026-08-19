import { getTranslations } from "next-intl/server";

import AISuggestions from "@/src/components/AISuggestions";
import MoviesCarousel from "@/src/components/MoviesCarousel";
import { SortDropdown } from "@/src/components/SortDropdown";
import { getDiscoverMovies } from "@/src/lib/getMovies";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    genre?: string;
    sort_by?: string;
  }>;
};

async function GenrePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { genre, sort_by } = await searchParams;
  const movies = await getDiscoverMovies({ id, sortingOption: sort_by });
  const t = await getTranslations("common");

  return (
    <div className="max-w-screen-2xl mx-auto px-5 md:px-10">
      <div className="flex flex-col space-y-5 mt-20 md:mt-28">
        <h1 className="text-4xl md:text-6xl font-bold">
          {t("resultsFor")} {genre}
        </h1>

        {genre && <AISuggestions term={genre} />}

        <div className="flex justify-between items-center !mb-6">
          <h2 className="text-3xl font-semibold py-2">{t("movies")}</h2>
          <SortDropdown baseLink={`genre/${id}?genre=${genre}&sort_by=`} />
        </div>

        <MoviesCarousel movies={movies} isVertical />
      </div>
    </div>
  );
}

export default GenrePage;
