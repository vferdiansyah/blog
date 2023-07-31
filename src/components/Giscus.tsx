import type { BooleanString, InputPosition, Mapping } from '@giscus/react';
import GiscusComponent from '@giscus/react';
import { useTheme } from 'next-themes';

// TODO: type optional fields
type GiscusConfig = {
  provider: 'giscus';
  giscusConfig: {
    themeURL?: string;
    theme?: string;
    darkTheme?: string;
    mapping: Mapping;
    repo: string;
    repositoryId: string;
    category: string;
    categoryId: string;
    reactions: BooleanString;
    metadata: BooleanString;
    inputPosition?: InputPosition;
    lang?: string;
  };
};

export type CommentsConfig = GiscusConfig;

/**
 * @example
 * const comments: CommentsConfig = {
 *   provider: 'giscus',
 *   giscusConfig: {
 *     // Visit the link below, and follow the steps in the 'configuration' section
 *     // https://giscus.app/
 *     repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
 *     repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
 *     category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
 *     categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
 *     mapping: 'pathname', // supported options: pathname, url, title
 *     reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
 *     // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
 *     metadata: '0',
 *     // theme example: light, dark, dark_dimmed, dark_high_contrast
 *     // transparent_dark, preferred_color_scheme, custom
 *     theme: 'light',
 *     // theme when dark mode
 *     darkTheme: 'transparent_dark',
 *     // If the theme option above is set to 'custom`
 *     // please provide a link below to your custom theme css file.
 *     // example: https://giscus.app/themes/custom_example.css
 *     themeURL: '',
 *   },
 * }
 */
type CommentsProps = {
  commentsConfig: CommentsConfig;
};

type GiscusProps = GiscusConfig['giscusConfig'];

const Giscus = ({
  themeURL,
  theme,
  darkTheme,
  repo,
  repositoryId,
  category,
  categoryId,
  reactions,
  metadata,
  inputPosition,
  lang,
  mapping,
}: GiscusProps) => {
  const { theme: nextTheme, resolvedTheme } = useTheme();
  const commentsTheme =
    themeURL === ''
      ? nextTheme === 'dark' || resolvedTheme === 'dark'
        ? darkTheme
        : theme
      : themeURL;

  const COMMENTS_ID = 'comments-container';

  return (
    <GiscusComponent
      id={COMMENTS_ID}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      repo={repo}
      repoId={repositoryId}
      category={category}
      categoryId={categoryId}
      mapping={mapping}
      reactionsEnabled={reactions}
      emitMetadata={metadata}
      inputPosition={inputPosition}
      theme={commentsTheme}
      lang={lang}
      loading="lazy"
    />
  );
};

/**
 * Supports Giscus
 * If you want to use a comments provider you have to add it to the
 * content security policy in the `next.config.js` file.
 *
 * @param {CommentsProps} { comments }
 * @return {*}
 */
export const Comments = ({ commentsConfig }: CommentsProps) => {
  return <Giscus {...commentsConfig.giscusConfig} />;
};
