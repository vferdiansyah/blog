import type {
  InternalDocSearchHit,
  StoredDocSearchHit,
} from '@docsearch/react/dist/esm/types';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

const CustomLink = ({
  href,
  ...rest
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    return <Link href={href} {...rest} />;
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};

function Hit({
  hit,
  children,
}: {
  hit: InternalDocSearchHit | StoredDocSearchHit;
  children: React.ReactNode;
}) {
  return <CustomLink href={hit.url}>{children}</CustomLink>;
}

export default Hit;
