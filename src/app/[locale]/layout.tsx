import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { getMessages } from "next-intl/server";

import Header from "@/src/components/header/Header";
import { ThemeProvider } from "@/src/components/providers/ThemeProvider";
import { routing } from "@/src/i18n/routing";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextMov | Movies & Series with AI Suggestions",
  description:
    "Discover your next favorite movie or series with NextMov. This platform uses TMDb data and offers an AI assistant for personalized suggestions based on your input.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
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
            <SpeedInsights />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
