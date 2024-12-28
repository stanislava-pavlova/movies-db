import { getTranslations } from "next-intl/server";

import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MoviesCarousel from "@/components/MoviesCarousel";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/getMovies";

export default async function Home() {
  const t = await getTranslations("common");

  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main>
      {/* <h1 className="">MovieMate</h1> */}
      <CarouselBannerWrapper />

      <div className="flex flex-col space-y-2 xl:-mt-48">
        <MoviesCarousel movies={upcomingMovies} title={t("upcoming")} />
        <MoviesCarousel movies={topRatedMovies} title={t("topRated")} />
        <MoviesCarousel movies={popularMovies} title={t("popular")} />
      </div>
    </main>
  );
}
