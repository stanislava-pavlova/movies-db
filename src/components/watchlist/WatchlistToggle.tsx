"use client";

import { useState, useTransition } from "react";

import { useTranslations } from "next-intl";

import {
  addToWatchlistAction,
  removeFromWatchlistAction,
} from "@/src/actions/watchlist";

import WatchlistButton from "./WatchlistButton";

type WatchlistToggleProps = {
  movieId: number;
  initialIsInWatchlist: boolean;
};

export default function WatchlistToggle({
  movieId,
  initialIsInWatchlist,
}: WatchlistToggleProps) {
  const t = useTranslations("watchlist");
  const [isPending, startTransition] = useTransition();
  const [isInWatchlist, setIsInWatchlist] = useState(initialIsInWatchlist);

  function handleToggle() {
    const next = !isInWatchlist;
    setIsInWatchlist(next); // optimistic update

    startTransition(async () => {
      try {
        if (next) {
          await addToWatchlistAction(movieId);
        } else {
          await removeFromWatchlistAction(movieId);
        }
      } catch {
        setIsInWatchlist(!next); // revert on error
      }
    });
  }

  return (
    <WatchlistButton
      isInWatchlist={isInWatchlist}
      isPending={isPending}
      label={isInWatchlist ? t("remove") : t("add")}
      onClick={handleToggle}
    />
  );
}
