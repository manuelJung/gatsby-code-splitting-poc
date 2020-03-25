const path = require('path')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({graphql, actions}) => {
  const gq = await graphql(`{
    posts:allPostsJson {
      nodes {
        slug
        widgets
        widgetPaths
      }
    }
  }`)

  actions.createPage({
    path: '/',
    component: path.resolve(__dirname, 'src/templates/Homepage.js'),
    widgets: {
      WidgetExample1: path.resolve(__dirname, 'src/widgets/WidgetExample1.js'),
      WidgetExample2: path.resolve(__dirname, 'src/widgets/WidgetExample2.js')
    }
  })

  gq.data.posts.nodes.forEach(node => actions.createPage({
    path: `/posts/${node.slug}`,
    component: path.resolve(__dirname, 'src/templates/Post.js'),
    context: { slug: node.slug },
    widgets: node.widgetPaths
  }))
}

exports.createSchemaCustomization = ({ actions, cache }) => {
  const { createFieldExtension, createTypes } = actions
  createFieldExtension({
    name: 'WidgetPaths',
    extend: () => ({
      resolve: async source => {
        if(!source.widgets) return null
        let paths = {}
        source.widgets.forEach(({name}) => {
          paths[name] = path.resolve(__dirname, `src/widgets/${name}.js`)
        })
        return paths
      }
    })
  })

  const typeDefs = `
    type PostsJson implements Node {
      widgets: JSON,
      widgetPaths: JSON @WidgetPaths
    }
  `
  createTypes(typeDefs)
}