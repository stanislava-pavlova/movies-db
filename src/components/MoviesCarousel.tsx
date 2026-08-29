import { cn } from "@/src/lib/utils";
import { Movie } from "@/types";

import MovieCard from "./MovieCard";
import WatchlistToggle from "./watchlist/WatchlistToggle";

type MoviesCarouselProps = {
  movies: Movie[];
  title?: string;
  isVertical?: boolean;
  watchlistedIds?: number[];
};

function MoviesCarousel({
  movies,
  title,
  isVertical,
  watchlistedIds,
}: MoviesCarouselProps) {
  return (
    <div className="z-30">
      {title && <h2 className="text-3xl font-semibold py-2 mb-6">{title}</h2>}

      <div
        className={cn(
          "flex space-x-4 overflow-scroll scrollbar-hide py-5 ",
          isVertical && "flex-col space-x-0 space-y-12"
        )}
      >
        {isVertical
          ? movies.map((movie, index) => (
              <div
                key={movie.id}
                className={cn(
                  isVertical &&
                    "flex flex-col space-y-5 md:space-x-5 mb-5 items-center lg:flex-row"
                )}
              >
                <MovieCard
                  movie={movie}
                  lazyLoading={index > 2}
                  watchlistToggle={
                    watchlistedIds && (
                      <WatchlistToggle
                        movieId={movie.id}
                        initialIsInWatchlist={watchlistedIds.includes(movie.id)}
                      />
                    )
                  }
                />
                <div>
                  <p className="font-bold">
                    {movie.title} ({movie.release_date?.split("-")[0]})
                  </p>
                  <hr className="mb-3" />
                  <p>{movie.overview}</p>
                </div>
              </div>
            ))
          : movies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                lazyLoading={index > 2}
                watchlistToggle={
                  watchlistedIds !== undefined ? (
                    <WatchlistToggle
                      movieId={movie.id}
                      initialIsInWatchlist={watchlistedIds.includes(movie.id)}
                    />
                  ) : undefined
                }
              />
            ))}
      </div>
    </div>
  );
}

export default MoviesCarousel;
