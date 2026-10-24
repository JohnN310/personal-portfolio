export const dynamic = "force-static";
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProduction = !!process.env.SITE_URL;
  return {
    rules: {
      userAgent: '*',
      allow: isProduction ? '/' : undefined,
      disallow: isProduction ? undefined : '/',
    },
    sitemap: process.env.SITE_URL ? `${process.env.SITE_URL}/sitemap.xml` : undefined,
  };
}
