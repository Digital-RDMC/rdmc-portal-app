// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }
import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en-US', 'fr-FR', 'ar']; // Supported locales
const defaultLocale = 'en-US'; // Default fallback

export function middleware(req: Request) {
  const headers = { 'accept-language': req.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  const matchedLocale = match(languages, locales, defaultLocale);

  const url = new URL(req.url);
  url.pathname = `/${matchedLocale}${url.pathname}`;

  return NextResponse.rewrite(url);
}
