import Comments from '@/components/Comments';
import Image from '@/components/Image';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import SectionContainer from '@/components/SectionContainer';
import metadata from '@/data/metadata';
import { CoreContent } from '@/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import { ReactNode } from 'react';
import Bleed from '../Bleed';

type LayoutProps = {
  content: CoreContent<Blog>;
  children: ReactNode;
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
};

function PostMinimal({ content, next, prev, children }: LayoutProps) {
  const { title, images } = content;
  const displayImage =
    images && images.length > 0
      ? images[0]
      : 'https://picsum.photos/seed/picsum/800/400';

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          <div className="space-y-1 pb-10 text-center dark:border-gray-700">
            <div className="w-full">
              <Bleed>
                <div className="aspect-[2/1] w-full relative">
                  <Image
                    src={displayImage}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Bleed>
            </div>
            <div className="pt-10 relative">
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
          <div className="prose max-w-none py-4 dark:prose-invert">
            {children}
          </div>
          {metadata.comments && (
            <div
              className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
              id="comment"
            >
              <Comments />
            </div>
          )}
          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && prev.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${prev.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && next.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${next.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  );
}

export default PostMinimal;
