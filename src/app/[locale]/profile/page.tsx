import { getLocale, getTranslations } from "next-intl/server";

import { auth } from "@/src/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { redirect } from "@/src/i18n/routing";
import { getInitials } from "@/src/lib/userUtils";

export default async function ProfilePage() {
  const session = await auth();
  const t = await getTranslations("auth");
  const locale = await getLocale();

  const { user } = session ?? {};

  if (!user) {
    redirect({ href: "/", locale: locale });
    return null;
  }

  const { name, email, image } = user;
  const initials = getInitials(name);

  return (
    <main className="max-w-screen-md mx-auto px-5 md:px-10 mt-24 md:mt-32">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">{t("account")}</h1>

      <div className="flex items-center gap-4 rounded-lg border bg-card p-6 shadow-sm">
        <Avatar className="h-16 w-16">
          <AvatarImage src={image ?? undefined} alt={name ?? t("account")} />
          <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          {name && <p className="text-xl font-semibold">{name}</p>}
          {email && <p className="text-sm text-muted-foreground">{email}</p>}
        </div>
      </div>
    </main>
  );
}
