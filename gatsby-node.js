const path = require('path')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = ({graphql, actions}) => {
  actions.createPage({
    path: '/my-path',
    component: path.resolve(__dirname, 'src/templates/TemplateA.js'),
    widgets: {
      WidgetA: path.resolve(__dirname, 'src/components/WidgetA.js')
    }
  })
}