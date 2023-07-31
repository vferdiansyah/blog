'use client';

import type { MDXComponents } from 'mdx/types';
import Image from './Image';
import Link from './Link';
import Pre from './Pre';
import TOCInline from './TOCInline';

const components: MDXComponents = {
  Image,
  TOCInline,
  a: Link,
  pre: Pre,
};

export default components;
