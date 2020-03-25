const path = require('path')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = ({graphql, actions}) => {
  actions.createPage({
    path: '/',
    component: path.resolve(__dirname, 'src/templates/Homepage.js'),
    widgets: {
      WidgetExample1: path.resolve(__dirname, 'src/widgets/WidgetExample1.js'),
      WidgetExample2: path.resolve(__dirname, 'src/widgets/WidgetExample2.js')
    }
  })
}