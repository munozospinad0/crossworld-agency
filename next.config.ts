import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const securityHeaders = [
  {key: 'X-Content-Type-Options', value: 'nosniff'},
  {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
  {key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()'},
  {key: 'X-Frame-Options', value: 'DENY'},
  {
    // Report-Only las primeras dos semanas; luego pasa a Content-Security-Policy (sin nonce, ver especificación §8).
    key: 'Content-Security-Policy-Report-Only',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com https://va.vercel-scripts.com",
      "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://vitals.vercel-insights.com",
      "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self'",
      'frame-src https://challenges.cloudflare.com https://www.google.com',
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {formats: ['image/avif', 'image/webp']},
  async headers() {
    return [{source: '/(.*)', headers: securityHeaders}];
  },
  async redirects() {
    // Los redirects corren antes del proxy. Sources sin barra final (Next la normaliza con 308 antes).
    return [
      {source: '/', destination: '/en', permanent: true},
      {source: '/about', destination: '/en/about', permanent: true},
      {source: '/contact', destination: '/en/contact', permanent: true},
      {source: '/products', destination: '/en/services', permanent: true},
      {source: '/projects', destination: '/en/services', permanent: true},
      {source: '/feed', destination: '/en/rss.xml', permanent: true},
      {source: '/comments/feed', destination: '/en/rss.xml', permanent: true},
    ];
  },
};

export default withNextIntl(nextConfig);
