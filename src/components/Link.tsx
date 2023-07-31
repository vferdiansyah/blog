import NextLink from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

const Link = ({
  href,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    const { ref, ...restWithoutRef } = rest;
    return <NextLink href={href} {...restWithoutRef} />;
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};

export default Link;
