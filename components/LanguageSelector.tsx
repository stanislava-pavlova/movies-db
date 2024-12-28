import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeMapping } from "@/src/i18n/routing";

async function LanguageSelector() {
  const locale = await getLocale();
  const t = await getTranslations("common");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        {t(localeMapping[locale])} <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(localeMapping).map(([fullLocale, shortLocale]) => (
          <DropdownMenuItem key={fullLocale}>
            <Link href={`/${shortLocale}`} className="w-full">
              {t(shortLocale)}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
