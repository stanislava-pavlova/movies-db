"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/src/auth";
import { addToWatchlist, removeFromWatchlist } from "@/src/lib/watchlist";

async function requireUserId(): Promise<string> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Authentication required");
  }

  return session.user.id;
}

export async function addToWatchlistAction(movieId: number): Promise<void> {
  const userId = await requireUserId();
  await addToWatchlist(userId, movieId);
  revalidatePath("/[locale]/watchlist", "page");
}

export async function removeFromWatchlistAction(
  movieId: number,
): Promise<void> {
  const userId = await requireUserId();
  await removeFromWatchlist(userId, movieId);
  revalidatePath("/[locale]/watchlist", "page");
}
