"use client";

import { Bookmark } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

type WatchlistButtonProps = {
  isInWatchlist: boolean;
  isPending?: boolean;
  label: string;
  onClick?: () => void;
  className?: string;
};

export default function WatchlistButton({
  isInWatchlist,
  isPending = false,
  label,
  onClick,
  className,
}: WatchlistButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      disabled={isPending}
      onClick={onClick}
      className={cn(
        "absolute top-3 right-3 z-30 h-9 w-9 rounded-full border-white/20 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:text-white",
        isInWatchlist && "border-amber-400/60 bg-amber-500/90 text-white hover:bg-amber-500",
        className
      )}
    >
      <Bookmark
        className={cn("h-4 w-4", isInWatchlist && "fill-current")}
      />
    </Button>
  );
}
