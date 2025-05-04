import { getTranslations } from "next-intl/server";

import CarouselBannerWrapper from "@/src/components/CarouselBannerWrapper";
import MoviesCarousel from "@/src/components/MoviesCarousel";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/src/lib/getMovies";

export default async function Home() {
  const t = await getTranslations("common");

  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main className="max-w-screen-2xl mx-auto">
      {/* <h1 className="">MovieMate</h1> */}
      <CarouselBannerWrapper />

      <section className="bg-[#1A1C29] py-16 ps-5 md:ps-10">
        <MoviesCarousel movies={upcomingMovies} title={t("upcoming")} />
      </section>

      <section className="bg-gray-800 py-16 ps-5 md:ps-10">
        <MoviesCarousel movies={topRatedMovies} title={t("topRated")} />
      </section>

      <section className="bg-[#1A1C29] py-16 ps-5 md:ps-10">
        <MoviesCarousel movies={popularMovies} title={t("popular")} />
      </section>
    </main>
  );
}
