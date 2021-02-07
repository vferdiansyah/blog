require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    siteTitle: `Behind the Codes`,
    siteTitleAlt: `Behind the Codes - Veri Ferdiansyah`,
    siteUrl: `https://veriferdiansyah.com`,
    siteDescription: `Everything that happens behind every lines of code that I write.`,
    siteLanguage: `en_US`,
    author: `Veri Ferdiansyah`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        feedTitle: `Behind the Codes - Veri Ferdiansyah`,
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `LinkedIn`,
            url: `https://www.linkedin.com/in/vferdiansyah`,
          },
          {
            name: `Twitter`,
            url: `https://twitter.com/vferdiansyah`,
          },
          {
            name: `Instagram`,
            url: `https://www.instagram.com/vferdiansyah_/`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Behind the Codes - Veri Ferdiansyah`,
        short_name: `Behind the Codes`,
        description: `Everything that happens behind every lines of code that I write.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
  ],
}
