import { ReactNode } from 'react';
import type { AlgoliaConfig } from './Algolia';
import { AlgoliaSearchProvider } from './Algolia';

export type SearchConfig = AlgoliaConfig;
export interface SearchConfigProps {
  searchConfig: SearchConfig;
  children: ReactNode;
}

/**
 * Command palette like search component - `ctrl-k` to open the palette.
 * Or use the search context to bind toggle to an onOpen event.
 * Currently supports Algolia.
 *
 * To toggle the modal or search from child components, use the search context:
 *
 * For Algolia:
 * ```
 * import { AlgoliaSearchContext } from '@/components/search'
 * const { query } = useContext(AlgoliaSearchContext)
 * ```
 *
 * @param {SearchConfig} searchConfig
 * @return {*}
 */
export const SearchProvider = ({
  searchConfig,
  children,
}: SearchConfigProps) => {
  if (searchConfig && searchConfig.provider) {
    return (
      <AlgoliaSearchProvider algoliaConfig={searchConfig.algoliaConfig}>
        {children}
      </AlgoliaSearchProvider>
    );
  } else {
    return <>{children}</>;
  }
};
