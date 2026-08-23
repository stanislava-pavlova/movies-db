import { getLocale, getTranslations } from "next-intl/server";

import { auth } from "@/src/auth";
import WatchlistEmptyState from "@/src/components/watchlist/WatchlistEmptyState";
import { redirect } from "@/src/i18n/routing";

export default async function ProfilePage() {
  const session = await auth();
  const t = await getTranslations("auth");
  const locale = await getLocale();

  const { user } = session ?? {};

  if (!user) {
    redirect({ href: "/", locale: locale });
    return null;
  }

  return (
    <main className="max-w-screen-md mx-auto px-5 md:px-10 mt-24 md:mt-32">
      <WatchlistEmptyState
        title={t("watchlistEmptyStateTitle")}
        description={t("watchlistEmptyStateDescription")}
      />
    </main>
  );
}
