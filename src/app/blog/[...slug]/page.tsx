import MDXComponents from '@/components/MDXComponents';
import { MDXLayoutRenderer } from '@/components/MDXLayoutRenderer';
import PageTitle from '@/components/PageTitle';
import PostBanner from '@/components/layouts/PostBanner';
import PostLayout from '@/components/layouts/PostLayout';
import PostSimple from '@/components/layouts/PostSimple';
import siteMetadata from '@/data/metadata';
import { coreContent, sortPosts } from '@/utils/contentlayer';
import type { Authors, Blog } from 'contentlayer/generated';
import { allAuthors, allBlogs } from 'contentlayer/generated';
import { Metadata } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'));
  const post = allBlogs.find((p) => p.slug === slug);
  const authorList = post?.authors || ['default'];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    return coreContent(authorResults as Authors);
  });
  if (!post) {
    return;
  }

  const publishedAt = new Date(post.date).toISOString();
  const modifiedAt = new Date(post.lastmod || post.date).toISOString();
  const authors = authorDetails.map((author) => author.name);
  let imageList = [siteMetadata.socialBanner];
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images;
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    };
  });

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  };
}

export const generateStaticParams = async () => {
  const paths = allBlogs.map((p) => ({ slug: p.slug.split('/') }));

  return paths;
};

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'));
  const sortedPosts = sortPosts(allBlogs) as Blog[];
  const postIndex = sortedPosts.findIndex((p) => p.slug === slug);
  const prev = coreContent(sortedPosts[postIndex + 1]);
  const next = coreContent(sortedPosts[postIndex - 1]);
  const post = sortedPosts.find((p) => p.slug === slug) as Blog;
  const authorList = post?.authors || ['default'];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    return coreContent(authorResults as Authors);
  });
  const mainContent = coreContent(post);
  const jsonLd = post.structuredData;
  jsonLd.author = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    };
  });

  let Layout;
  switch (post.layout) {
    case 'PostSimple': {
      Layout = PostSimple;
      break;
    }
    case 'PostLayout': {
      Layout = PostLayout;
      break;
    }
    case 'PostBanner': {
      Layout = PostBanner;
      break;
    }
    default: {
      Layout = PostLayout;
    }
  }

  return (
    <>
      {isProduction && post && 'draft' in post && post.draft === true ? (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      ) : (
        <>
          <script type="application/ld+json" suppressHydrationWarning>
            {JSON.stringify(jsonLd)}
          </script>
          <Layout
            content={mainContent}
            authorDetails={authorDetails}
            next={next}
            prev={prev}
          >
            <MDXLayoutRenderer
              code={post.body.code}
              components={MDXComponents}
              toc={post.toc}
            />
          </Layout>
        </>
      )}
    </>
  );
}
