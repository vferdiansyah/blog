'use client';

import { DetailedHTMLProps, HTMLAttributes, useContext } from 'react';
import { AlgoliaContext } from './Algolia';

/**
 * Button wrapper component that triggers the Algolia modal on click.
 */
export const AlgoliaButton = ({
  children,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  const { query } = useContext(AlgoliaContext);

  return (
    <button {...rest} onClick={() => query.toggle()}>
      {children}
    </button>
  );
};
