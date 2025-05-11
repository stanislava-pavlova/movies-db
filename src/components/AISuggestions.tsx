"use client"; // not needed if we do not use swr

import { useLocale, useTranslations } from "next-intl";
import useSWR from "swr";

const fetcher = async (term: string, locale: string) => {
  return fetch(`/${locale}/suggestions?term=${term}`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  });
};

function AISuggestions({ term }: { term: string }) {
  const locale = useLocale();
  const t = useTranslations("common");

  const { data, error, isLoading, isValidating } = useSWR(
    term ? `/${locale}/suggestions?term=${term}` : null, // Key includes `term` to cache different results
    () => fetcher(term, locale),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60 * 60 * 24, // cache for 24 hours
    }
  );

  const generateText = () => {
    if (isLoading || isValidating)
      return (
        <>
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
          <p className="text-sm text-gray-400 ml-3">{t("aiLoading")}</p>
        </>
      );

    if (error) return <>{t("error")}</>;

    if (!data || !data.message) return <>{t("error")}</>;

    return (
      <>
        <div
          className="hidden md:block w-12 h-14 flex-shrink-0 bg-gradient-to-tr from-purple-500 to-sky-400 animate-pulse"
          style={{
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }}
        ></div>

        <div>
          <p className="text-sm text-gray-400 mb-2">{t("aiSuggests")}</p>
          <p className="italic text-base md:text-xl text-justify">
            {data.message}
          </p>
        </div>
      </>
    );
  };

  return <div className="flex md:space-x-5 items-center">{generateText()}</div>;
}

export default AISuggestions;
