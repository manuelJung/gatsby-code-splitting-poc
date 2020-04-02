module.exports = {
  siteMetadata: {
    title: `Code-splitting POC`,
    description: `A small POC to demonstrate how to code split dynamic React-Components`,
    author: `Manuel Jung`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/cms/posts`,
      },
    },
  ],
}
