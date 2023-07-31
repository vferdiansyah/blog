const metadata = {
  title: 'Improve 1% everyday | Veri Ferdiansyah',
  author: 'Veri Ferdiansyah',
  headerTitle: 'Improve 1% everyday | Veri Ferdiansyah',
  description:
    'My personal blog, where I share my learnings about software engineering',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://vferdiansyah.vercel.app',
  siteRepo: 'https://github.com/vferdiansyah/blog',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'veri.ferdi@gmail.com',
  github: 'https://github.com/vferdiansyah',
  twitter: 'https://twitter.com/vferdiansyah',
  linkedin: 'https://www.linkedin.com/in/vferdiansyah',
  locale: 'en-US',
  analytics: {
    googleAnalytics: {
      googleAnalyticsId: 'G-CEKKYCBSBL',
    },
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    provider: 'algolia',
    algoliaConfig: {
      appId: 'IPL13DJVKR',
      apiKey: 'fa6449d2f30d66bf7c61b2e655b4f713',
      indexName: 'docsearch',
    },
  },
};

module.exports = metadata;
