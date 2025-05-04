import { GoogleGenerativeAI } from "@google/generative-ai";
import { getLocale } from "next-intl/server";

import { Genre, SearchResults } from "@/types";

const getOptions = (cacheTime?: number): RequestInit => {
  return {
    method: "GET",
    headers: {
      accept: "application/json;",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24, // 24 hours by default
    },
  };
};

async function fetchFromTMDB(
  url: URL,
  cacheTime?: number
): Promise<SearchResults> {
  const locale = await getLocale();
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("sort_by", "popularity.desc");
  url.searchParams.set("language", locale ?? "en-US");
  url.searchParams.set("page", "1");

  const options = getOptions(cacheTime);

  const response = await fetch(url.toString(), options);
  const data = await response.json();

  return data;
}

export async function getUpcomingMovies() {
  const url = new URL("https://api.themoviedb.org/3/movie/upcoming");
  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getTopRatedMovies() {
  const url = new URL("https://api.themoviedb.org/3/movie/top_rated");
  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getPopularMovies() {
  const url = new URL("https://api.themoviedb.org/3/movie/popular");
  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getDiscoverMovies(id?: string, keywords?: string) {
  const url = new URL("https://api.themoviedb.org/3/discover/movie");

  keywords && url.searchParams.set("with_keywords", keywords);
  id && url.searchParams.set("with_genres", id);

  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getSearchMovies(term: string) {
  const url = new URL("https://api.themoviedb.org/3/search/movie");

  url.searchParams.set("query", term);

  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getGenres(): Promise<Genre[]> {
  const url = new URL("https://api.themoviedb.org/3/genre/movie/list");

  const options = getOptions();
  const locale = await getLocale();
  url.searchParams.set("language", locale ?? "en-US");

  const response = await fetch(url.toString(), options);
  const data = await response.json();

  return data.genres;
}

export async function genearateAI(term: string | null, locale: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

  const prompt = `I like ${term}.`;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are a digital video assistant working for services such as Netflix, Disney Plus & Amazon Prime Video. Your job is to provide suggestions based on the videos the user specifies. Provide an quirky breakdown of what the user should watch next! It should only list the names of the films after the introduction. Keep the response short and sweet! Always list at least 3 films as suggestions. If the user mentions a genre, you should provide a suggestion based on that genre. Movies should be listed as follows: 1) Movie 1; 2) Movie 2; Translate the results based on this locae: ${locale}`,
  });

  const data = await model.generateContent(prompt);
  const text = data.response.text();

  return text;
}
