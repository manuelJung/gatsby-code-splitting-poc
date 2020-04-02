const path = require('path')

exports.createPages = async ({graphql, actions}) => {
  const gq = await graphql(`{
    posts:allPostsJson {
      nodes {
        slug
        widgetResolvers
      }
    }
  }`)

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

  /**
   * More advanced example that generated posts. The widget-paths are created
   * by our field-extension defined in 'createSchemaCustomization'
   * These widget paths are mapped to react components that are accessible in
   * the page-component
   */
  gq.data.posts.nodes.forEach(node => actions.createPage({
    path: `/posts/${node.slug}`,
    component: path.resolve(__dirname, 'src/templates/Post.js'),
    context: { slug: node.slug },
    widgets: node.widgetPaths
  }))
  gq.data.posts.nodes.forEach(node => {
    actions.createPage({
      path: `/posts/${node.slug}`,
      component: path.resolve(__dirname, 'src/templates/Post.js'),
      context: { slug: node.slug },
    })
    node.widgetResolvers.forEach(resolver => {
      actions.addModuleToPageDependencies({
        path: `/posts/${node.slug}`,
        module: resolver.path,
        identifier: resolver.name
      })
    })
  })
}

/**
 * I've create an helper resolver for the widget paths. That way
 * I don't have to calculate the widgets each time (WidgetPaths)
 */
exports.createSchemaCustomization = ({ actions, cache }) => {
  const { createFieldExtension, createTypes } = actions
  createFieldExtension({
    name: 'WidgetResolvers',
    extend: () => ({
      resolve: async source => {
        if(!source.widgets) return null
        return source.widgets.map(widget => ({
          name: widget.name,
          path: path.resolve(__dirname, `src/widgets/${widget.name}.js`)
        }))
      }
    })
  })

  const typeDefs = `
    type PostsJson implements Node {
      widgets: JSON,
      widgetResolvers: JSON @WidgetResolvers
    }
  `
  createTypes(typeDefs)
}