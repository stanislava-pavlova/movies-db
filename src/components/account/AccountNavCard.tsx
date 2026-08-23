import { ChevronRight, type LucideIcon } from "lucide-react";

import { Link } from "@/src/i18n/routing";
import { cn } from "@/src/lib/utils";

type AccountNavCardProps = {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export default function AccountNavCard({
  href,
  icon: Icon,
  title,
  description,
  className,
}: AccountNavCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm transition-all hover:border-primary/25 hover:bg-accent/40 hover:shadow-md",
        className
      )}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-medium leading-none">{title}</p>
        <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
      </div>

      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
    </Link>
  );
}
