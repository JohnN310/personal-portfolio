export const dynamic = "force-static";
import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!process.env.SITE_URL) return [];
  
  const baseUrl = process.env.SITE_URL;
  
  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    ...projectUrls
  ];
}
