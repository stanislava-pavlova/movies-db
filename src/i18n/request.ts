import { getRequestConfig } from "next-intl/server";

import { localeMapping, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Map to the corresponding short locale for messages
  const language = localeMapping[locale] || locale;

  return {
    locale,
    messages: (await import(`../messages/${language}.json`)).default,
  };
});
