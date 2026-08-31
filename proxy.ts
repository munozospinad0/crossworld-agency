import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from './i18n/routing';

const intl = createMiddleware(routing);

// Rutas del WordPress viejo que ya no existen: 410 Gone (redirects() de Next no admite 410).
const GONE = [
  /^\/wp-(content|admin|includes|json)\//,
  /^\/xmlrpc\.php$/,
  /^\/wp-login\.php$/,
  /^\/(category|tag|author)\//,
];

export default function proxy(req: NextRequest) {
  const {pathname, search} = req.nextUrl;
  if (GONE.some((r) => r.test(pathname))) return new NextResponse(null, {status: 410});
  if (pathname !== pathname.toLowerCase()) {
    return NextResponse.redirect(new URL(pathname.toLowerCase() + search, req.url), 308);
  }
  return intl(req);
}

export const config = {
  matcher: [
    '/((?!api|keystatic|_next|_vercel|.*\\..*).*)',
    '/wp-content/:path*',
    '/wp-admin/:path*',
    '/wp-includes/:path*',
    '/wp-json/:path*',
    '/wp-login.php',
    '/xmlrpc.php',
  ],
};
