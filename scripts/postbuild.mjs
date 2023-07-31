/* eslint-disable import/extensions */
import rss from './rss.mjs';
import sitemap from './sitemap.mjs';

async function postbuild() {
  await Promise.all([rss(), sitemap()]);
}

postbuild();
