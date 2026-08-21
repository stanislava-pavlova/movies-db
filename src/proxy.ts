import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

// TODO: later add proxy: https://authjs.dev/getting-started/installation#configure

export const config = {
  matcher: ["/", "/(en|bg)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};