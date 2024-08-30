import { Movie } from "@/types";

import MovieCard from "./MovieCard";

type Props = {
  movies: Movie[];
  title?: string;
  isVertical?: boolean;
};
function MoviesCarousel({ movies, title, isVertical }: Props) {
  return (
    <div className="z-50">
      <h2>{title}</h2>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MoviesCarousel;
