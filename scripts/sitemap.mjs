/* eslint-disable import/no-extraneous-dependencies */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { globby } from 'globby';
import matter from 'gray-matter';
import { resolveConfig, format } from 'prettier';
// eslint-disable-next-line import/extensions
import metadata from '../data/metadata.js';

async function generateSitemap() {
  const prettierConfig = await resolveConfig('../.prettierrc');
  const pages = await globby([
    'src/app/page.tsx',
    'data/blog/**/*.mdx',
    'data/blog/**/*.md',
    'public/tags/**/*.xml',
  ]);

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                // Exclude drafts from the sitemap
                if (page.search('.md') >= 1 && existsSync(page)) {
                  const source = readFileSync(page, 'utf8');
                  const fm = matter(source);
                  if (fm.data.draft) {
                    return;
                  }
                  if (fm.data.canonicalUrl) {
                    return;
                  }
                }
                const path = page
                  .replace('src/app/', '/')
                  .replace('data/blog', '/blog')
                  .replace('public/', '/')
                  .replace('.js', '')
                  .replace('.tsx', '')
                  .replace('.mdx', '')
                  .replace('.md', '')
                  .replace('/feed.xml', '');
                const route = path === '/page' ? '' : path;

                if (
                  page.search('src/app/not-found.') > -1 ||
                  page.search(`src/app/blog/[...slug].`) > -1
                ) {
                  return;
                }
                return `
                        <url>
                            <loc>${metadata.siteUrl}${route}</loc>
                        </url>
                    `;
              })
              .join('')}
        </urlset>
    `;

  const formatted = await format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  // eslint-disable-next-line no-sync
  writeFileSync('public/sitemap.xml', formatted);
}

const sitemap = () => {
  generateSitemap();
  console.log('Sitemap generated...');
};
export default sitemap;
