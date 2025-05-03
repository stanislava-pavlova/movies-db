import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { getMessages } from "next-intl/server";

import Header from "@/components/header/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { localeMapping, routing } from "@/src/i18n/routing";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextMov | Movies & Series with AI Suggestions",
  description:
    "Discover your next favorite movie or series with NextMov. This platform uses TMDb data and offers an AI assistant for personalized suggestions based on your input.",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const language = localeMapping[locale] || locale;

  return (
    <html lang={language}>
      <body className="bg-white dark:bg-[#1A1C29]">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
