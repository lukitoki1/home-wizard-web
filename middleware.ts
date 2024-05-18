import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';
import { cookieName, fallbackLanguage, languages } from './lib/i18n/settings';
import { logger } from '@/lib/logger';
import { getLngPath } from '@/lib/i18n/utils';
import { urlHeaderName } from '@/lib/values/headers';

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

const isResPath = (path: string) =>
  path.includes('icon') || path.includes('chrome') || path.startsWith('/_next');

const isPathLngSupported = (path: string) =>
  languages.some((loc) => path.startsWith(getLngPath(loc)));

function resolveLng(req: NextRequest) {
  let lng: string | undefined | null;

  if (req.cookies.has(cookieName)) {
    const cookieValue = req.cookies.get(cookieName)?.value;

    logger.info(`cookie value: ${cookieValue}`);

    lng = acceptLanguage.get(cookieValue);
  }

  if (!lng) {
    const headerValue = req.headers.get('Accept-Language');

    logger.info(`header value: ${headerValue}`);

    lng = acceptLanguage.get(headerValue);
  }

  if (!lng) {
    lng = fallbackLanguage;
  }

  return lng;
}

/**
 * This middleware is used for the purpose of i18n.
 * The middleware tries to deduce client language, if no language is present in the URL, based on:
 *
 * - i18next cookie value
 * - Accept-Language header value.
 *
 * If deduction fails, fallbackLanguage value is used.
 * User is then redirected to a resolved language.
 * Some sources paths are skipped.
 * @param req NextRequest object
 */
export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(urlHeaderName, req.url);

  const resp = NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });

  if (isResPath(req.nextUrl.pathname)) {
    return resp;
  }

  if (isPathLngSupported(req.nextUrl.pathname)) {
    return resp;
  }

  logger.info('middleware running');

  const lng = resolveLng(req);

  logger.info(`resolved language: ${lng}`);

  return NextResponse.redirect(new URL(getLngPath(lng, req.nextUrl.pathname), req.url));
}
