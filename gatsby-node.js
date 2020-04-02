const path = require('path')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({graphql, actions}) => {
  // actions.myAction('it works')
  // const gq = await graphql(`{
  //   posts:allPostsJson {
  //     nodes {
  //       slug
  //       widgets
  //       widgetPaths
  //     }
  //   }
  // }`)

  /**
   * Basic example that adds widgets manually. Widgets are added the same way
   * the page component is added
   */
  actions.createPage({
    path: '/',
    component: path.resolve(__dirname, 'src/templates/Homepage.js'),
  })

  actions.addModuleToPageDependencies({
    path: '/',
    module: path.resolve(__dirname, 'src/widgets/WidgetExample1.js'),
    identifier: 'WidgetExample1'
  })

  actions.addModuleToPageDependencies({
    path: '/',
    module: path.resolve(__dirname, 'src/widgets/WidgetExample2.js'),
    identifier: 'WidgetExample2'
  })

  // /**
  //  * More advanced example that generated posts. The widget-paths are created
  //  * by our field-extension defined in 'createSchemaCustomization'
  //  * These widget paths are mapped to react components that are accessible in
  //  * the page-component
  //  */
  // gq.data.posts.nodes.forEach(node => actions.createPage({
  //   path: `/posts/${node.slug}`,
  //   component: path.resolve(__dirname, 'src/templates/Post.js'),
  //   context: { slug: node.slug },
  //   widgets: node.widgetPaths
  // }))
}

/**
 * I've create an helper resolver for the widget paths. That way
 * I don't have to calculate the widgets each time (WidgetPaths)
 */
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