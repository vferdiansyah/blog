import ListLayout from '@/components/layouts/ListLayoutWithTags';
import metadata from '@/data/metadata';
import { allCoreContent } from '@/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { slug } from 'github-slugger';
import { Metadata } from 'next';
import { genPageMetadata } from '../../seo';
import tagData from '../../tag-data.json';

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const tag = params.tag;
  return genPageMetadata({
    title: tag,
    description: `${metadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${metadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  });
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const paths = tagKeys.map((tag) => ({
    tag: tag,
  }));
  return paths;
};

export default function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params;
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1);
  const filteredPosts = allCoreContent(
    allBlogs.filter(
      (post) =>
        post.draft !== true &&
        post.tags &&
        post.tags.map((t) => slug(t)).includes(tag),
    ),
  );
  return <ListLayout posts={filteredPosts} title={title} />;
}
