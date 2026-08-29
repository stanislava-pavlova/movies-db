import { getTranslations } from "next-intl/server";

import { auth } from "@/src/auth";
import CarouselBannerWrapper from "@/src/components/CarouselBannerWrapper";
import MoviesCarousel from "@/src/components/MoviesCarousel";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/src/lib/getMovies";
import { getWatchlistMovieIds } from "@/src/lib/watchlist";

export default async function Home() {
  const t = await getTranslations("common");
  const session = await auth();

  const [upcomingMovies, topRatedMovies, popularMovies, watchlistedIds] =
    await Promise.all([
      getUpcomingMovies(),
      getTopRatedMovies(),
      getPopularMovies(),
      session?.user?.id ? getWatchlistMovieIds(session.user.id) : undefined,
    ]);

  return (
    <main className="max-w-screen-2xl mx-auto">
      <CarouselBannerWrapper />

      <section className="bg-[#1A1C29] py-12 md:py-16 ps-5 md:ps-10">
        <MoviesCarousel
          movies={upcomingMovies}
          title={t("upcoming")}
          watchlistedIds={watchlistedIds}
        />
      </section>

      <section className="bg-gray-800 py-12 md:py-16 ps-5 md:ps-10">
        <MoviesCarousel
          movies={topRatedMovies}
          title={t("topRated")}
          watchlistedIds={watchlistedIds}
        />
      </section>

      <section className="bg-[#1A1C29] py-12 md:py-16 ps-5 md:ps-10">
        <MoviesCarousel
          movies={popularMovies}
          title={t("popular")}
          watchlistedIds={watchlistedIds}
        />
      </section>
    </main>
  );
}
