import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { DropdownMenuItem } from "@/src/components/ui/dropdown-menu";
import { routing } from "@/src/i18n/routing";

import DropdownWrapper from "./GenreDropdown";

async function LanguageSelector({ locale }: { locale: string }) {
  const t = await getTranslations("common");

  return (
    <DropdownWrapper title={t(locale)}>
      {routing.locales.map((loc) => (
        <DropdownMenuItem key={loc}>
          <Link href={`/${loc}`} className="w-full">
            {t(loc)}
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownWrapper>
  );
}

export default LanguageSelector;
