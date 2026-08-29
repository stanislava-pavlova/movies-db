import client from "@/src/lib/mongodb";
import type { WatchlistItem } from "@/types/watchlist";

const DB_NAME = "disney-clone";
const COLLECTION = "watchlists";

function getCollection() {
  return client.db(DB_NAME).collection<WatchlistItem>(COLLECTION);
}

export async function addToWatchlist(
  userId: string,
  movieId: number,
): Promise<void> {
  await getCollection().updateOne(
    { userId, movieId },
    { $setOnInsert: { userId, movieId, addedAt: new Date() } },
    { upsert: true },
  );
}

export async function removeFromWatchlist(
  userId: string,
  movieId: number,
): Promise<void> {
  await getCollection().deleteOne({ userId, movieId });
}

export async function getWatchlistMovieIds(userId: string): Promise<number[]> {
  const items = await getCollection()
    .find({ userId }, { projection: { movieId: 1, _id: 0 } })
    .toArray();

  return items.map((item) => item.movieId);
}

export async function isInWatchlist(
  userId: string,
  movieId: number,
): Promise<boolean> {
  const item = await getCollection().findOne(
    { userId, movieId },
    { projection: { _id: 1 } },
  );

  return item !== null;
}
