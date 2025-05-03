import { Menu } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Genre } from "@/types";

import { GenreDropdown } from "./GenreDropdown";
import LanguageSelector from "./LanguageSelector";
import SearchInput from "./SearchInput";

async function DrawerMenu({
  genres,
  locale,
}: {
  genres: Genre[];
  locale: string;
}) {
  const t = await getTranslations("common");

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">{t("drawerMenu")}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="flex justify-between">
            <LanguageSelector locale={locale} />
            <GenreDropdown genres={genres} />
          </div>
          <SearchInput />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">{t("closeDrawer")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerMenu;
