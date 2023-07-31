'use client';

import type { MDXComponents } from 'mdx/types';
import React, { ComponentType, useMemo } from 'react';
import ReactDOM from 'react-dom';
import * as _jsx_runtime from 'react/jsx-runtime';

export type MDXLayoutRendererProps = {
  code: string;
  components?: MDXComponents;
  [key: string]: unknown;
};

const getMDXComponent = (
  code: string,
  globals: Record<string, unknown> = {},
): ComponentType<any> => {
  const scope = { React, ReactDOM, _jsx_runtime, ...globals };
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const fn = new Function(...Object.keys(scope), code);
  return fn(...Object.values(scope)).default;
};

// TS transpile it to a require which causes ESM error
// Copying the function from contentlayer as a workaround
// Copy of https://github.com/contentlayerdev/contentlayer/blob/main/packages/next-contentlayer/src/hooks/useMDXComponent.ts
export const useMDXComponent = (
  code: string,
  globals: Record<string, unknown> = {},
): ComponentType<any> => {
  return useMemo(() => getMDXComponent(code, globals), [code, globals]);
};

export const MDXLayoutRenderer = ({
  code,
  components,
  ...rest
}: MDXLayoutRendererProps) => {
  const Mdx = useMDXComponent(code);

  return <Mdx components={components} {...rest} />;
};
