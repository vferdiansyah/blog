import { MetadataRoute } from 'next';
import metadata from '@/data/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${metadata.siteUrl}/sitemap.xml`,
    host: metadata.siteUrl,
  };
}
