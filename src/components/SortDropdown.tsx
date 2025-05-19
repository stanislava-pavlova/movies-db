import { getTranslations } from "next-intl/server";

import { DropdownMenuItem } from "@/src/components/ui/dropdown-menu";
import { Link } from "@/src/i18n/routing";
import { SortOptions } from "@/types";

import DropdownWrapper from "./GenreDropdown";

const sortLabels: Record<keyof typeof SortOptions, string> = {
  popularityDesc: "sort.popularityDesc",
  releaseDateDesc: "sort.releaseDateDesc",
  releaseDateAsc: "sort.releaseDateAsc",
  titleAsc: "sort.titleAsc",
  titleDesc: "sort.titleDesc",
};

export const SortDropdown = async ({ baseLink }: { baseLink: string }) => {
  const t = await getTranslations("common");

  return (
    <DropdownWrapper
      title={t("sortBy")}
      menuLabel={t("selectSortOption")}
      buttonClassName="rounded-md px-4 bg-popover h-11"
    >
      {Object.entries(SortOptions).map(([key, value]) => (
        <Link key={value} href={`/${baseLink}${value}`} prefetch={false}>
          <DropdownMenuItem className="cursor-pointer">
            {t(sortLabels[key as keyof typeof SortOptions])}
          </DropdownMenuItem>
        </Link>
      ))}
    </DropdownWrapper>
  );
};
