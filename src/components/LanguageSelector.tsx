import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { DropdownMenuItem } from "@/src/components/ui/dropdown-menu";
import { localeMapping } from "@/src/i18n/routing";

import DropdownWrapper from "./GenreDropdown";

async function LanguageSelector({ locale }: { locale: string }) {
  const t = await getTranslations("common");

  return (
    <DropdownWrapper title={t(localeMapping[locale])}>
      {Object.entries(localeMapping).map(([fullLocale, shortLocale]) => (
        <DropdownMenuItem key={fullLocale}>
          <Link href={`/${shortLocale}`} className="w-full">
            {t(shortLocale)}
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownWrapper>
  );
}

export default LanguageSelector;
