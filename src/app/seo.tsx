import metadata from '@/data/metadata';
import { Metadata } from 'next';

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function genPageMetadata({
  title,
  description,
  image,
  ...rest
}: PageSEOProps): Metadata {
  return {
    title,
    openGraph: {
      title: `${title} | ${metadata.title}`,
      description: description || metadata.description,
      url: './',
      siteName: metadata.title,
      images: image ? [image] : [metadata.socialBanner],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${metadata.title}`,
      card: 'summary_large_image',
      images: image ? [image] : [metadata.socialBanner],
    },
    ...rest,
  };
}
