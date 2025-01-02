import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AppConfig } from '@/utils/AppConfig';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  defaultLocale: AppConfig.defaultLocale,
  localePrefix: AppConfig.localePrefix,
});

const protectedRoutes = ['/dashboard'];
const authRoutes = ['/auth/login', '/auth/register'];

const isProtectedRoute = (pathname: string) => {
  return protectedRoutes.some((route) => pathname.includes(route));
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('ascent_u_access_token');

  // Get locale from NEXT_LOCALE cookie or use default
  const cookieLocale =
    request.cookies.get('NEXT_LOCALE')?.value || AppConfig.defaultLocale;

  // Skip middleware for static files, API routes, and other assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  // Handle root path
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${cookieLocale}`, request.url));
  }

  // Check if the pathname has a valid locale
  const hasValidLocale = AppConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // Handle non-localized paths
  if (!hasValidLocale) {
    // Handle auth routes
    if (authRoutes.includes(pathname)) {
      const route = pathname.split('/auth/')[1];
      return NextResponse.redirect(
        new URL(`/${cookieLocale}/auth/${route}`, request.url),
      );
    }

    // For non-localized paths, add the locale
    return NextResponse.redirect(
      new URL(`/${cookieLocale}${pathname}`, request.url),
    );
  }

  // Protected routes check
  if (isProtectedRoute(pathname) && !token) {
    return NextResponse.redirect(
      new URL(`/${cookieLocale}/auth/login`, request.url),
    );
  }

  // Prevent authenticated users from accessing auth pages
  if (pathname.includes('/auth/') && token) {
    return NextResponse.redirect(
      new URL(`/${cookieLocale}/dashboard`, request.url),
    );
  }

  // Use the intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
