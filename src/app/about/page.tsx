import { MDXLayoutRenderer } from '@/components/MDXLayoutRenderer';
import AuthorLayout from '@/components/layouts/AuthorLayout';
import { coreContent } from '@/utils/contentlayer';
import { Authors, allAuthors } from 'contentlayer/generated';
import { genPageMetadata } from '../seo';

export const metadata = genPageMetadata({ title: 'About' });

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors;
  const mainContent = coreContent(author);

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  );
}
