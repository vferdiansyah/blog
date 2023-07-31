import metadata from '@/data/metadata';
import { allBlogs } from 'contentlayer/generated';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = metadata.siteUrl;
  const blogRoutes = allBlogs.map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.lastmod || post.date,
  }));

  const routes = ['', 'blog', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogRoutes];
}
