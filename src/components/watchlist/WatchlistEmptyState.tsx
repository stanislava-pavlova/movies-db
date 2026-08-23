import { Bookmark } from "lucide-react";

type WatchlistEmptyStateProps = {
  title: string;
  description: string;
};

export default function WatchlistEmptyState({
  title,
  description,
}: WatchlistEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <Bookmark className="h-7 w-7 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
