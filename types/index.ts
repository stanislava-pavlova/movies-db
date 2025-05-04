export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  release_date: any;
};

export type SearchResults = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type Genres = {
  genres: Genre[];
};

export enum SortOptions {
  popularityDesc = "popularity.desc",
  releaseDateDesc = "release_date.desc",
  releaseDateAsc = "release_date.asc",
  titleAsc = "original_title.asc",
  titleDesc = "original_title.desc",
}
